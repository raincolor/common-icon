import { defineConfig } from 'vitepress';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import VueMacros from 'unplugin-vue-macros/vite';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: '../packages',
  outDir:'../dist',
  base: './',
  vite: {
    base: './',
    // 需要配置vite插件（内置了vue插件），因为vitepress不会去查找vite.config.ts的配置
    plugins: [svgLoader(), cssInjectedByJsPlugin(), 
      VueMacros({
        // plugins: {
        //   vue: vue(),
        //   // vueJsx: VueJsx(), // if needed
        // },
      }),
    ],
  },
  title: "icons",
  description: "icon components",
  rewrites: {
    'demo/:page': ':page',
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Icons', link: '/icons' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide' },
        ]
      },
      {
        text: 'Components',
        items: [
          { text: 'Icons', link: '/icons' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
