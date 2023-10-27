---
outline: deep
---
## Install

```cmd
yarn add tcwicons  
```
   
   
## Examples

::: code-group

```TS [Only use some icons]
<template>
  <!-- enableOriginColor: 是否使用icon自带的颜色值 -->
  <IconHome :enableOriginColor="true" />
</template>

<script setup lang="ts">
import {IconHome} from 'tcwicons';
</script>
```

```TS [Inject all]
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

:::


## Icons

<script setup lang="ts">
import './base.css'
import Icons from './components/icons.vue';
</script>

<Icons />
