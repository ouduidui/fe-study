<script setup>
  import images from '../utils/waterfallData';
  import { reactive, ref, onMounted, nextTick } from 'vue';

  const startTime = new Date().getTime();

  const data = reactive([...images]);

  onMounted(() => {
    computeWaterfall(data);
  });

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
        return;
      }

      nextTick(() => {
        const leftHeight = leftList.value.offsetHeight;
        const rightHeight = rightList.value.offsetHeight;
        if (leftHeight <= rightHeight) {
          leftData.push(newData[i++]);
        } else {
          rightData.push(newData[i++]);
        }

        _computeWaterfall();
      });
    };

    _computeWaterfall();
  };
</script>

<template>
  <div className="page">
    <div>
      <div ref="leftList">
        <div v-for="image in leftData" className="item">
          <img :src="`/src/assets/${image}`" />
        </div>
      </div>
    </div>
    <div>
      <div ref="rightList">
        <div v-for="image in rightData" className="item">
          <img :src="`/src/assets/${image}`" />
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
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
  }

  .item img {
    width: 100%;
    vertical-align: middle;
  }
</style>
