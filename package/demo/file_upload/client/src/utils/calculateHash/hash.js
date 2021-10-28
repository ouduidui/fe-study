// 引入spark-md5
self.importScripts('spark-md5.min.js');

self.onmessage = e => {
  // 接收主线程传递的数据
  const {chunks} = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();

  let index = 0;

  const loadNext = () => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(chunks[index].file);
    reader.onload = e => {
      index++;
      spark.append(e.target.result);

      if (index === chunks.length) {
        self.postMessage({
          hash: spark.end()
        })
      } else {
        loadNext();
      }
    }
  }

  loadNext();
}
