<script setup lang="ts">
import type { VideoItem } from '@/types/video'

const { data: channelList }: any = await useFetch('/api/channel');

const { data: videoList }: any = await useFetch('/api/video');


// 显示的列表
const list = ref<VideoItem[]>([])
// 加载状态
const loading = ref(false)
// 是否加载完成
const finished = ref(false)

// 页码 和 页容量
let page = 1
let pageSize = 20

// 滚动触底触发
const onLoad = () => {
    // 表示正在加载
    loading.value = false
    // 根据当前页码提取数据
    const data = videoList.value?.slice(
        (page - 1) * pageSize,
        page * pageSize,
    ) as VideoItem[]
    // 追加到用于渲染的数组中
    list.value.push(...data)
    // 页码累加
    page++
    // 加载结束
    if (videoList.value?.length === list.value.length) {
        finished.value = true
    }
}
onLoad();
</script>

<template>
    <van-sticky>
        <!-- 公共头部 -->
        <AppHeader></AppHeader>
        <!-- 频道模块 -->
        <van-tabs>
            <van-tab v-for="item in channelList" :key="item.id" :title="item.name" />
        </van-tabs>
    </van-sticky>

    <!-- 视频列表 -->

    <van-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <AppVideoList :list="list" />
    </van-list>
</template>

<style lang="scss">
// 视频列表
.video-list {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 5px;
}
</style>