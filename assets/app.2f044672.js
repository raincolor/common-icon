import{d as p,H as s,ad as i,u,k as c,h as l,ae as d,af as f,ag as m,ah as h,ai as A,aj as g,ak as P,al as v,am as y,an as C,ao as w,ap as _,aq as E,ar as R}from"./chunks/framework.85e12dcb.js";import{t as b}from"./chunks/theme.9a34927e.js";function r(e){if(e.extends){const a=r(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const n=r(b),D=p({name:"VitePressApp",setup(){const{site:e}=u();return c(()=>{l(()=>{document.documentElement.lang=e.value.lang,document.documentElement.dir=e.value.dir})}),d(),f(),m(),n.setup&&n.setup(),()=>h(n.Layout)}});async function j(){const e=S(),a=O();a.provide(A,e);const t=g(e.route);return a.provide(P,t),a.component("Content",v),a.component("ClientOnly",y),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),n.enhanceApp&&await n.enhanceApp({app:a,router:e,siteData:C}),{app:a,router:e,data:t}}function O(){return w(D)}function S(){let e=s,a;return _(t=>{let o=E(t);return e&&(a=o),(e||a===o)&&(o=o.replace(/\.js$/,".lean.js")),s&&(e=!1),R(()=>import(o),[])},n.NotFound)}s&&j().then(({app:e,router:a,data:t})=>{a.go().then(()=>{i(a.route,t.site),e.mount("#app")})});export{j as createApp};