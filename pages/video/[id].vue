<template>
    <!-- 公共头部 -->
    <van-sticky>
        <!-- 头部 -->
        <AppHeader></AppHeader>

        <!-- 弹幕 -->
        <van-barrage v-model="barrageList" :auto-play="false" ref="barrageRef">
            <!-- 视频 -->
            <video controls class="video-play" ref="videoRef" @play="onPlay" @pause="onPause" :poster="detail?.pic"
                src="https://video.pearvideo.com/mp4/third/20230706/cont-1784445-12033417-151259-hd.mp4"></video>
        </van-barrage>
    </van-sticky>
    <div class="info">
        <h1 class="title-text">{{ detail?.title }}</h1>
        <div class="body">
            <div class="author">
                <img class="avatar" :src="detail?.author.face" />
                <span class="name">{{ detail?.author.name }}</span>
            </div>
        </div>
    </div>
    <!-- 相关推荐 -->
    <div class="relate">
        <h3 class="relate-title">相关推荐</h3>
        <div class="relate-list">
           <AppVideoList :list="list" />
        </div>
    </div>
   
</template>

<script setup lang="ts">
import type { BarrageInstance } from 'vant'
import type { VideoItem } from '@/types/video'
const { data: videoList }: any = await useFetch('/api/video');

const { params } = useRoute();

// 弹幕相关
const barrageList = ref([
    { id: 100, text: '轻量' },
    { id: 101, text: '可定制的' },
    { id: 102, text: '移动端' },
    { id: 103, text: 'Vue' },
    { id: 104, text: '组件库' },
    { id: 105, text: 'VantUI' },
    { id: 106, text: '666' },
])

const barrageRef = ref<BarrageInstance>()

const onPlay = () => {
    barrageRef.value?.play()
}

const onPause = () => {
    barrageRef.value?.pause()
}

// 通过路由参数获取视频id
const { data: detail } = await useFetch(`/api/video/${params.id}`)

console.log("11111111111",detail.value);

// 动态设置标题
useSeoMeta({
    title: `${detail.value?.title}_哔哩哔哩bilibili_${detail.value?.author.name}`,
})

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

<style lang="scss" scoped>
.video-play {
    width: 100vw;
    height: auto;
    object-fit: contain;
    background-color: #fff;
}

.info {
    padding: 10px;
    border-bottom: 1px solid #eee;

    .title-text {
        font-size: 16px;
        font-weight: normal;
    }

    .body {
        display: flex;
        margin-top: 20px;
        justify-content: space-between;
        align-items: center;
    }

    .author {
        display: flex;
        align-items: center;

        .avatar {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 1px solid #ccc;
        }

        .name {
            margin-left: 10px;
            font-size: 14px;
        }
    }
}

.relate {
    .relate-title {
        height: 32px;
        display: flex;
        align-items: center;
        font-size: 14px;
        font-weight: normal;
        padding: 0 10px;
        color: #333;
    }

    .relate-list {
        display: flex;
        flex-wrap: wrap;
        padding: 0 5px;
    }
}
</style>