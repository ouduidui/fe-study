<script setup>
import axios from "axios";
import {reactive} from "vue";
import {calculateHashByWorker} from "../utils/calculateHash";
import {createUploadChunk} from "../utils/createChunk";

let file = null;  // 存放文件
const chunksProcess = reactive([]);


// 获取文件
const fileChangeHandle = async (e) => file = e.target.files[0] || null;

// 文件上传
const uploadFile = async () => {
  if (!file) {
    alert("请选择文件");
    return;
  }

  // 生成hash和chunks
  const hash = await calculateHashByWorker(file);
  const chunks = createUploadChunk(file, hash)

  // 上传切片
  await uploadSliceFile(chunks);
  // 通知服务端合并
  await mergeRequest(hash, file.name)
};

const uploadSliceFile = (chunks) => {
  return new Promise(async (resolve) => {
    const requests = chunks.map(chunk => {
      const form = new FormData();
      form.append('index', chunk.index);
      form.append('name', chunk.name);
      form.append('file', chunk.file);
      form.append('hash', chunk.hash);

      return form
    }).map((form, index) => {
      axios.post('/api/slice', form, {
        onUploadProgress(process) {
          chunksProcess[index] = (process.loaded / process.total * 100);
        }
      })
    })

    resolve(await Promise.all(requests));
  })

}

const mergeRequest = async (hash, filename) => {
  await axios.post('/api/merge', {
    hash,
    filename
  })
}
</script>

<template>
  <h3>3. 切片上传</h3>
  <div>
    <input
      type="file"
      @change="fileChangeHandle"
    />
    <button @click="uploadFile">上传</button>
  </div>

  <div class="process-box">
    <div v-for="process in chunksProcess" class="process">
      <div class="active-process" :style="{top: (100 - process) + '%'}"/>
    </div>
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

.process-box {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-gap: 5px;
  width: calc(8 * 20px + 7 * 5px);
  margin: 20px auto 0;
}

.process {
  position: relative;
  width: 20px;
  height: 20px;
  background: #ddd;
  border-radius: 3px;
  overflow: hidden;
}

.active-process {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #222;
}
</style>

