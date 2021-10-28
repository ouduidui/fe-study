<script setup>
import NormalFileUpload from './components/normal-file-upload.vue';
import CalculateFileHash from './components/calculate-file-hash.vue';
import FileSliceUpload from './components/file-slice-upload.vue';
</script>

<template>
  <h1>File Upload Demo</h1>
  <normal-file-upload/>
  <br>
  <calculate-file-hash/>
  <br>
  <file-slice-upload/>
  <br>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
