<script setup>
import axios from "axios";
import { ref } from "vue";

const isUploading = ref(false);
const uploadProcess = ref(0);

let file = null;

// 获取文件
const fileChangeHandle = (e) => (file = e.target.files[0] || null);

const uploadFile = async () => {
  if (!file) {
    alert("请选择文件");
    return;
  }

  // 新建form
  const form = new FormData();
  form.append("name", file.name);
  form.append("file", file);

  const { data } = await axios.post("/api/file/v1", form, {
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
  <h3>1. use form</h3>
  <div>
    <input type="file" name="file" @change="fileChangeHandle" />
    <button @click="uploadFile">上传</button>
  </div>
  <div class="line" v-show="isUploading">
    <div class="line-active" :style="{ width: uploadProcess + '%' }" />
  </div>
</template>

<style scope>
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
