# Icons Components


  
目 录 结 构
```
docs // vitePress 文档配置目录
resources // svg资源目录
lib // 组件编译输出目录
scripts // 处理resources资源生成组件到packages的脚本和模板
types // 组件源码自动生成的定义文件
packages // 组件源码
  - index.ts //组件入口
  - svg // 处理过后的svg资源（resources中的svg去除宽高熟悉）
    -- index.d.ts 
    -- action // svg分类文件夹, 由代码生成
  - demo // 组件文档
  -components
    -- IconA.vue // 分类为common，名称为A的icon 组件, 由代码生成
    -- IconB.vue // 分类为other，名称为B的icon 组件, 由代码生成
    -- index.ts // components入口文件, 由代码生成
    -- index.less // icon的默认样式
    -- icons-categories.json // 组件的分类json, 由代码生成
```


## 使用 
**前置条件**

安装  
> yarn add  tcwicons

全局引入  
```
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import Icons from 'tcwicons';

const app = createApp(App);
app.use(Icons);
app.mount('#app');

// demo.vue
<template>
  <IconHome />
</template>
```

局部引入 
```
<template>
  <IconHome />
</template>

<script setup lang="ts">
import {IconHome} from 'tcwicons';
</script>
```

## 构建 & 发布

将需要纳入组件库的icon svg文件放到resources对应的目录，确保svg的文件名在整个resources中是唯一的。添加commit并push到远程仓库，项目就会自动CI/CD。   
在push到远程仓库之前可以本地yarn run build检查是否可以编译成功.  
项目构建使用 semantic-release 自动发布，参考[Publish npm packages to the GitLab Package Registry using semantic-release](https://docs.gitlab.com/ee/ci/examples/semantic-release.html)

发布过程为：

- yarn 安装依赖包
- yarn run build 执行构建（本项目通过配置 scripts: {"prepublish": "npm run build"}实现）
- yarn run semantic-release 版本更新并发布【注意：由于是发布到 gitlab 私有 npm，需要配置对应的.npmrc 文件，参考[.npmrc](https://docs.gitlab.com/ee/user/packages/npm_registry/#authenticating-via-the-npmrc)】
     
---    
### 手动发布可以参考Tag: 0.0.2的代码，yarn 1.x（已废弃）
>yarn &&  yarn run build & NPM_TOKEN=your_token yarn publish 
 
替换your_token为。npmrc中的_authToken   
参考：[Publish to GitLab Package Registry](https://docs.gitlab.com/ee/user/packages/yarn_repository/#publish-to-gitlab-package-registry)


### 不使用semantic-release进行自动发布可参考Tag: 0.0.3（已废弃）
参考：[Publish to GitLab Package Registry](https://docs.gitlab.com/ee/user/packages/yarn_repository/#publish-to-gitlab-package-registry) 


## 组件文档
> yarn run docs:dev
打开控制台中的地址即可