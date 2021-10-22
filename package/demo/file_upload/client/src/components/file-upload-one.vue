<script setup>
import axios from "axios";

let file = null;

// 获取文件
const fileChangeHandle = (e) => (file = e.target.files[0] || null);

const uploadFile = async () => {
  if (!file) {
    alert("请选择文件");
    return;
  }

  const form = new FormData();
  form.append("name", file.name);
  form.append("file", file);

  const { data } = await axios.post("/api/file/v1", form);
  alert(data.message);
};
</script>

<template>
  <div>
    <h3>1. use form</h3>
    <input type="file" name="file" @change="fileChangeHandle" />
    <button @click="uploadFile">上传</button>
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
</style>
