<script setup>
import createFileChunks from "./utils/createFileChunks";
import uploadChunks from "./utils/uploadChunks";
import {ElMessage} from 'element-plus'

let file = null;

/**
 * 选择文件
 * @param e
 */
const chooseFileHandle = (e) => ([file] = e.target.files);

const uploadHandle = async () => {
  if (!file) {
    return ElMessage.error('请选择文件');
  }
  const fileChunkList = createFileChunks(file);
  await uploadChunks(fileChunkList, file.name);
}
</script>

<template>
  <input type="file" @change="chooseFileHandle"/>
  <el-button @click="uploadHandle">上传</el-button>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 30px;
  text-align: center;
  color: #2c3e50;
}
</style>
