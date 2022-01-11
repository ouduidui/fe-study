<script setup>
import {createFileChunks} from "./utils/createFileChunks";
import {calculateHashProgress} from './utils/calculateHash';
import {uploadChunks, cancelUpload} from "./utils/uploadChunks";
import {ElMessage} from 'element-plus'
import {ref} from "vue";

let file = null;

/**
 * 选择文件
 * @param e
 */
const chooseFileHandle = (e) => ([file] = e.target.files);

const isUpload = ref(false);
const uploadProgress = ref([])

const uploadHandle = async () => {
  if (!file) {
    return ElMessage.error('请选择文件');
  }
  isUpload.value = true;
  uploadProgress.value = [];
  const {fileChunkList, fileHash} = await createFileChunks(file);
  const {isSuccess, message} = await uploadChunks(fileChunkList, file.name, fileHash, uploadProgress);
  isSuccess ? ElMessage.success(message) : ElMessage.error(message);
  isUpload.value = false;
}

const stopHandle = () => {
  cancelUpload();
  isUpload.value = false;
  ElMessage.success('已暂停上传');
}
</script>

<template>
  <input type="file" @change="chooseFileHandle"/>
  <el-button :disabled="isUpload" @click="uploadHandle">上传</el-button>
  <el-button :disabled="!isUpload" @click="stopHandle">暂停</el-button>
  <div class="progress">
    <p>计算Hash进度</p>
    <el-progress :percentage="calculateHashProgress >> 0"/>
    <p>上传进度</p>
    <el-progress
      :percentage="uploadProgress.length ? (uploadProgress.reduce((acc, cur) => acc + cur , 0) / uploadProgress.length * 100) >> 0 : 0"/>
  </div>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 30px;
  text-align: center;
  color: #2c3e50;
}

.progress {
  margin: 50px auto 0;
  width: 50vw;
}
</style>
