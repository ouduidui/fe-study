<script setup>
import {reactive, nextTick} from "vue";
import data from "../utils/data";

const startTime = new Date().getTime();
const listData = reactive(data);
nextTick(() => {
    console.log(`花费时间：${new Date().getTime() - startTime}ms`);
})
</script>

<template>
    <div class="text"
         v-for="item in listData">
        {{item}}
    </div>
</template>

<style scoped>
.text {
    text-align: center;
    padding: 10px 0;
}
</style>
