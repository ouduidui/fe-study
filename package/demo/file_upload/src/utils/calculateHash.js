import {ref} from "vue";

export const calculateHashProgress = ref(0);

export function calculateHash(fileChunkList) {
  calculateHashProgress.value = 0;
  return new Promise(resolve => {
    const work = new Worker('./hash.js');
    work.postMessage({fileChunkList});
    work.onmessage = e => {
      const {percentage, hash} = e.data;
      calculateHashProgress.value = percentage;
      if(hash) {
        resolve(hash);
      }
    }
  })
}
