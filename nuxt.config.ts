// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 是否开启Nuxt调试工具
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  // 开始ssr 服务端渲染 默认开启
  ssr: true,
  //应用模块
  modules:['@vant/nuxt'],
  postcss: {
    plugins: {
      'postcss-px-to-viewport': {
        viewportWidth: 375,
      },
    },
  },

});