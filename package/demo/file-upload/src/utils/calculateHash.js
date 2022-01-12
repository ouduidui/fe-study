import { ref } from 'vue';

// 计算hash进度 响应式数据
export const calculateHashProgress = ref(0);

/**
 * 计算文件的hash
 * @param fileChunkList
 * @return {Promise<unknown>}
 */
export function calculateHash(fileChunkList) {
  // 初始化进度
  calculateHashProgress.value = 0;

  return new Promise((resolve) => {
    // 使用web worker新建线程
    const work = new Worker('./hash.js');
    // 传入chunkList
    work.postMessage({ fileChunkList });
    // 监听计算进度
    work.onmessage = (e) => {
      const { percentage, hash } = e.data;
      calculateHashProgress.value = percentage;
      if (hash) {
        resolve(hash);
      }
    };
  });
}
