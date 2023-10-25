#  Icons Components


目录结构1111
```
docs // vitePress 文档配置目录2
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


