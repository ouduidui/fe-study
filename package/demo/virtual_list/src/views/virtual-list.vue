<script setup>
import {ref, onMounted, computed, nextTick, reactive} from "vue";
import data from "../utils/data";

const startTime = new Date().getTime();

const listData = reactive(data);

const scrollEvent = (e) => {
    const scrollTop = e.target.scrollTop;
    startIdx.value = Math.floor(scrollTop / itemHeight);
    startOffset.value = scrollTop - (scrollTop % itemHeight);
}

const itemHeight = 42;  // 每个item的高度
const screenHeight = ref(0);  // 屏幕可视高度
const startIdx = ref(0);  // 起始索引
const startOffset = ref(0);
const listHeight = computed(() => itemHeight * listData.length);
const visibleCount = computed(() => Math.ceil(screenHeight.value / itemHeight));  // 可显示的列表数量
const endIdx = computed(() => startIdx.value + visibleCount.value);  // 结束索引
const visibleData = computed(() => listData.slice(startIdx.value, Math.min(endIdx.value, data.length)))  // 显示数据

onMounted(() => {
    screenHeight.value = document.body.clientHeight;
    nextTick(() => {
        console.log(`花费时间：${new Date().getTime() - startTime}ms`);
    })
})
</script>

<template>
    <div class="page" @scroll="scrollEvent">
        <div class="scroll" :style="{height: listHeight + 'px'}"/>

        <div class="list" :style="{transform: `translateY(${startOffset}px)`}">
            <div class="list-item"
                 v-for="item in visibleData">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    height: 100vh;
    overflow: auto;
    position: relative;
    /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
    -webkit-overflow-scrolling: touch;
}

.scroll {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
}

.list {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
}

.list-item {
    text-align: center;
    padding: 10px 0;
}
</style>
