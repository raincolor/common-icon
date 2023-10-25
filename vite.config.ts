import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import svgLoader from 'vite-svg-loader';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import VueMacros from 'unplugin-vue-macros';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    cssInjectedByJsPlugin(),
    VueMacros.vite({
      // plugins: {
      //   vue: vue(),
      //   // vueJsx: VueJsx(), // if needed
      // },
    }),
  ],
  // base: './',
  build: {
    outDir: 'lib',
    emptyOutDir: false,
    rollupOptions: {
      // 请确保外部化那些你的库中不需要的依赖
      external: ['vue'],
      output: {
        // exports: 'named',
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
        },
      },
    },
    lib: {
      entry: './packages/index.ts',
      fileName: 'index',
      formats: ['es'],
    },
  },
});
