<script setup>
import images from "../utils/waterfallData";
import {reactive, ref, onMounted, nextTick, watch} from "vue";

const data = reactive([...images]);

let renderIdx = 0;

onMounted(() => {
    computeWaterfall(data);
    renderIdx = data.length;
})

watch(data, () => {
    computeWaterfall(data.slice(renderIdx));
    renderIdx = data.length;
})

const leftList = ref(null);
const rightList = ref(null);
const leftData = reactive([]);
const rightData = reactive([]);

const computeWaterfall = (newData = []) => {
    const len = newData.length;
    let i = 0;

    const _computeWaterfall = () => {
        if (i >= len) return;

        nextTick(() => {
            const leftHeight = leftList.value.offsetHeight;
            const rightHeight = rightList.value.offsetHeight;
            if (leftHeight <= rightHeight) {
                leftData.push(newData[i++])
            } else {
                rightData.push(newData[i++]);
            }

            _computeWaterfall();
        })
    }

    _computeWaterfall();
}

// 触底更新
window.addEventListener("scroll", () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
        data.push(...images);
    }
})
</script>

<template>
    <div class="page">
        <div>
            <div ref="leftList">
                <div v-for="image in leftData" class="item">
                    <img :src="`/src/assets/${image}`">
                </div>
            </div>
        </div>
        <div>
            <div ref="rightList">
                <div v-for="image in rightData" class="item">
                    <img :src="`/src/assets/${image}`">
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    padding: 0 15px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
}

.item {
    margin-bottom: 10px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, .5);
}

.item img {
    width: 100%;
    vertical-align: middle;
}
</style>
