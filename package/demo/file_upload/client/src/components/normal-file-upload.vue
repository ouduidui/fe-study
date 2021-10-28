<script setup>
import axios from "axios";
import checkIsImage from "../utils/checkIsImage.js";
import { ref } from "vue";

let file = null;  // 存放文件
const isUploading = ref(false);  // 判断是否在上传中
const uploadProcess = ref(0);   // 上传进度

// 获取文件
const fileChangeHandle = async (e) => {
  const localFile = e.target.files[0];
  if (!localFile) return;

  // 通过二进制判断文件格式，避免用户通过修改文件后缀来上传文件
  if (!(await checkIsImage(localFile))) return alert("请选择正确的图片格式");

  file = localFile;
};

// 文件上传
const uploadFile = async () => {
  if (!file) {
    alert("请选择文件");
    return;
  }

  // 新建form
  const form = new FormData();
  form.append("name", file.name);
  form.append("file", file);

  const { data } = await axios.post("/api/file", form, {
    // 获取进度条
    onUploadProgress(process) {
      isUploading.value = true;
      uploadProcess.value = (process.loaded / process.total) * 100;
    },
  });

  alert(data.message);
  isUploading.value = false;
};
</script>

<template>
  <h3>1. 简易版文件上传</h3>
  <div>
    <input
      type="file"
      accept="image/png, image/jpeg, image/jpg"
      @change="fileChangeHandle"
    />
    <button @click="uploadFile">上传</button>
  </div>
  <div class="line" v-show="isUploading">
    <div class="line-active" :style="{ width: uploadProcess + '%' }" />
  </div>
</template>

<style scoped>
button {
  background: transparent;
  border: 1px solid #222;
  width: 80px;
  height: 30px;
  border-radius: 15px;
}

.line,
.line-active {
  height: 6px;
  border-radius: 3px;
}

.line {
  position: relative;
  width: 333px;
  background-color: #ddd;
  display: flex;
  margin: 10px auto 0;
  overflow: hidden;
}

.line-active {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  background-color: #222;
}
</style>

