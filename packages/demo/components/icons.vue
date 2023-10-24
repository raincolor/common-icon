<template>
  <div style="text-align: right">
    <el-switch v-model="copyIcon" active-text="Copy icon code" inactive-text="Copy SVG content" />
  </div>
  <div v-for="item in categories" :key="item.name" class="demo-icon-item">
    <div class="demo-icon-title">{{ item.name }}</div>
    <ul class="demo-icon-list">
      <li
        v-for="component in item.icons"
        :key="component.name"
        :ref="component.name"
        class="icon-item"
        @click="copySvgIcon(component.name, $refs)"
      >
        <span class="demo-svg-icon">
          <component :is="component" class="icon-svg" />
          <span class="icon-name">{{ component.name.slice(4) }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import 'element-plus/dist/index.css';
  import { ref, shallowRef } from 'vue';
  import clipboardCopy from 'clipboard-copy';
  import { ElMessage, ElSwitch } from 'element-plus';
  import * as Icons from '../../components';
  import IconCategories from '../../components/icons-categories.json';
  import type { DefineComponent } from 'vue';

  type CategoriesItem = {
    name: string;
    icons: DefineComponent<{ enableOriginColor?: boolean }>[];
  };

  const copyIcon = ref(true);

  const copyContent = async (content: any) => {
    try {
      await clipboardCopy(content);

      ElMessage({
        showClose: true,
        message: 'copy success',
        type: 'success',
      });
    } catch {
      ElMessage({
        showClose: true,
        message: 'copy error',
        type: 'error',
      });
    }
  };

  const copySvgIcon = async (name: string, refs: any) => {
    if (copyIcon.value) {
      await copyContent(`<${name} />`);
    } else {
      console.log(refs, name);
      const content = refs[name]?.[0].querySelector('svg')?.outerHTML ?? '';
      await copyContent(content);
    }
  };

  const categories = shallowRef<CategoriesItem[]>([]);
  const iconMap = new Map(Object.entries(Icons));

  IconCategories.categories.forEach((o) => {
    const result: CategoriesItem = {
      name: o.name,
      icons: [],
    };
    o.items.forEach((i) => {
      const icon = iconMap.get(i);
      if (icon) {
        result.icons.push(icon as DefineComponent<{ enableOriginColor?: boolean }>);
        iconMap.delete(i);
      }
    });
    categories.value.push(result);
  });
  // categories.value.push({
  //   name: 'Other',
  //   icons: Array.from(iconMap.values()) as DefineComponent<{ enableOriginColor?: boolean }>[],
  // });
</script>

<style lang="less" scoped>
  .demo-icon {
    &-item {
      margin-top: 24px;
      &:first-child {
        margin-top: 0;
      }
    }
    &-title {
      font-weight: 400;
      font-size: 18px;
      line-height: 26px;
    }
    &-list {
      overflow: hidden;
      list-style: none;
      padding: 0 !important;
      border-top: 1px solid var(--el-border-color);
      border-left: 1px solid var(--el-border-color);
      border-radius: 4px;
      display: grid;
      grid-template-columns: repeat(5, 1fr);

      @media (min-width: 1920px) {
        grid-template-columns: repeat(8, 1fr);
      }
      .icon-item {
        margin-top: 0;
        text-align: center;
        color: var(--el-text-color-regular);
        height: 90px;
        font-size: 13px;
        border-right: 1px solid var(--el-border-color);
        border-bottom: 1px solid var(--el-border-color);
        transition: background-color var(--el-transition-duration);
        &:hover {
          background-color: var(--el-border-color-extra-light);
          .el-icon {
            color: var(--brand-color-light);
          }
          color: var(--brand-color-light);
        }

        .demo-svg-icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          cursor: pointer;

          svg {
            color: red;
            font-size: 24px;
          }
          .icon-name {
            margin-top: 8px;
          }
        }
      }
    }
  }
</style>
