<script setup lang="ts">
// SEO优化
useSeoMeta({
  title: "NuxtDemo",
  description: '这是一个Rebirth练习的Nuxt项目',
  keywords: 'NuxtDemo,Rebirth,Nuxt',
  referrer:'no-referrer'
})

</script>
<template>
  <!-- Nuxt是基于文件路由系统 -->
  <div>
    <!-- <NuxtLink to="/">首页</NuxtLink> -->
    <!-- <NuxtLink to="/video">视频播放页</NuxtLink> -->
    <!-- <NuxtWelcome /> -->
    <NuxtPage :keepalive="{ max: 10 }" />
  </div>
</template>

<style lang="scss">
// 基础样式
@import './assets/styles/base.scss';
// 字体图标
@import './assets/styles/iconfont.scss';

:root {
  --van-primary-color: #fb7299 !important;
  --van-back-top-background: #fbfbfb !important;
  --van-back-top-text-color: #666 !important;
}
</style>
