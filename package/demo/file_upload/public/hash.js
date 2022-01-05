// 导入脚本
self.importScripts("/spark-md5.min.js");

self.onmessage = e => {
  const {fileChunkList} = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;
  let count = 0;
  const nextLoad = index => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileChunkList[index].chunk);
    reader.onload = e => {
      count++;
      spark.append(e.target.result);
      if(count === fileChunkList.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close()
      }else {
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        nextLoad(count);
      }
    }
  }

  nextLoad(0)
}
