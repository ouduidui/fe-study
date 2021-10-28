<script setup>
import {reactive} from "vue";
import {calculateHashByWorker, calculateHashByIdle, calculateHashBySample} from "../utils/calculateHash";

const hashByWorker = reactive({hash: '', time: 0})
const hashByIdle = reactive({hash: '', time: 0})
const hashBySample = reactive({hash: '', time: 0})

// 获取文件
const fileChangeHandle = async (e) => calcFileHash(e.target.files[0]);

// 文件上传
const calcFileHash = async (file) => {
  if (!file) return;

  let startTime = new Date().getTime();
  hashByWorker.hash = await calculateHashByWorker(file);
  hashByWorker.time = new Date().getTime() - startTime;

  startTime = new Date().getTime();
  hashByIdle.hash = await calculateHashByIdle(file);
  hashByIdle.time = new Date().getTime() - startTime;

  startTime = new Date().getTime();
  hashBySample.hash = await calculateHashBySample(file);
  hashBySample.time = new Date().getTime() - startTime;
};
</script>

<template>
  <h3>2. 计算文件哈希值</h3>
  <div>
    <input
      type="file"
      @change="fileChangeHandle"
    />
  </div>
  <div class="item" v-show="hashByWorker.hash">
    「calculateHashByWorker」 哈希值： {{ hashByWorker.hash }}，消耗时间：{{ hashByWorker.time }}ms
  </div>
  <div class="item" v-show="hashByIdle.hash">
    「calculateHashByIdle」 哈希值： {{ hashByIdle.hash }}，消耗时间：{{ hashByIdle.time }}ms
  </div>
  <div class="item" v-show="hashBySample.hash">
    「calculateHashBySample」 哈希值： {{ hashBySample.hash }}，消耗时间：{{ hashBySample.time }}ms
  </div>
</template>

<style scoped>
.item {
  padding-top: 10px;
}
</style>
