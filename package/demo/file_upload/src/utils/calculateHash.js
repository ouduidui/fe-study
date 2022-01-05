export function calculateHash(fileChunkList) {
  return new Promise(resolve => {
    const work = new Worker('./hash.js');
    work.postMessage({fileChunkList});
    work.onmessage = e => {
      const {percentage, hash} = e.data;
      console.log('calculateHash percentage', percentage);
      if(hash) {
        resolve(hash);
      }
    }
  })
}
