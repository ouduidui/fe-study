<script setup>
import images from "../utils/waterfallData";
import {reactive, ref, onMounted, nextTick} from "vue";

const startTime = new Date().getTime();

const data = reactive([...images]);

onMounted(() => {
    computeWaterfall(data);
})

const leftList = ref(null);
const rightList = ref(null);
const leftData = reactive([]);
const rightData = reactive([]);

const computeWaterfall = (newData = []) => {
    const len = newData.length;
    let i = 0;

    const _computeWaterfall = () => {
        if (i >= len) {
            console.log(`花费时间：${new Date().getTime() - startTime}ms`);
            createObserve();
            return;
        }

        nextTick(() => {
            const leftHeight = leftList.value.offsetHeight;
            const rightHeight = rightList.value.offsetHeight;
            if (leftHeight <= rightHeight) {
                leftData.push({
                    idx: i,
                    image: newData[i++]
                })
            } else {
                rightData.push({
                    idx: i,
                    image: newData[i++]
                });
            }

            _computeWaterfall();
        })
    }

    _computeWaterfall();
}

let ob;
const createObserve =  () => {
    if (ob) return

    ob = new IntersectionObserver(entries => {
            console.log('entries', entries)
            entries.forEach(entry => {
                /**
                 * entry -> IntersectionObserverEntry提供观察元素的信息，有七个属性
                 *    - boundingClientRect 目标元素的矩形信息
                 *    - intersectionRatio 相交区域和目标元素的比例值 intersectionRect/boundingClientRect 不可见时小于等于0
                 *    - intersectionRect 目标元素和视窗（根）相交的矩形信息 可以称为相交区域
                 *    - isIntersecting 目标元素当前是否可见 Boolean值 可见为true
                 *    - rootBounds 根元素的矩形信息，没有指定根元素就是当前视窗的矩形信息
                 *    - target 观察的目标元素
                 *    - time 返回一个记录从IntersectionObserver的时间到交叉被触发的时间的时间戳
                 * */
                if(entry.intersectionRatio > 0) {
                    // console.log(entry);
                }
            })
        },
        {rootMargin: '30px'}
    )

    ob.observe(document.querySelector('.item'));
    // const elms = document.querySelectorAll('.item');
    // elms.forEach( elm => {
    //     ob.observe(elm);
    // })
}
</script>

<template>
    <div class="page">
        <div>
            <div ref="leftList">
                <div v-for="item in leftData"
                     :id="item.idx"
                     class="item">
                    <img :src="`/src/assets/${item.image}`">
                </div>
            </div>
        </div>
        <div>
            <div ref="rightList">
                <div v-for="item in rightData"
                     :id="item.idx"
                     class="item">
                    <img :src="`/src/assets/${item.image}`">
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
