import sparkMD5 from "spark-md5";
import {createFileChunk, createFileSampleChunk} from "../createChunk";

/**
 * Worker方式计算文件Hash
 * @desc https://developer.mozilla.org/zh-CN/docs/Web/API/Worker
 * @param file
 * @return {Promise<string>}
 */
export const calculateHashByWorker = (file) => {
  const chunks = createFileChunk(file);

  return new Promise(resolve => {
    const worker = new Worker('/eventBus/utils/calculateHash/hash.js');
    worker.postMessage({chunks});
    worker.onmessage = e => {
      if (e.data.hash) {
        resolve(e.data.hash);
      }
    }
  })
}

/**
 * 事件切片方式计算文件Hash
 * @desc https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestIdleCallback
 * @param file
 * @return {Promise<string>}
 */
export const calculateHashByIdle = (file) => {
  const chunks = createFileChunk(file);

  return new Promise(resolve => {
    const spark = new sparkMD5.ArrayBuffer();
    let count = 0;

    const appendToSpark = async file => {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = e => {
          spark.append(e.target.result);
          resolve();
        }
      })
    }
    const workLoop = async deadline => {
      while (count < chunks.length && deadline.timeRemaining() > 1) {
        await appendToSpark(chunks[count].file);
        count++;
        if (count >= chunks.length) {
          resolve(spark.end())
        }
      }
      window.requestIdleCallback(workLoop);
    }

    // 将在浏览器空闲时期被调用
    window.requestIdleCallback(workLoop);
  })
}

/**
 * 抽样方式计算文件Hash
 * @param file
 * @return {Promise<string>}
 */
export const calculateHashBySample = (file) => {
  return new Promise(resolve => {
    const spark = new sparkMD5.ArrayBuffer();
    const reader = new FileReader();

    const chunks = createFileSampleChunk(file);

    reader.readAsArrayBuffer(new Blob(chunks));
    reader.onload = e => {
      spark.append(e.target.result);
      resolve(spark.end());
    }
  })
}
