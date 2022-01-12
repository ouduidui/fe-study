// 导入脚本
self.importScripts("/spark-md5.min.js");

self.onmessage = e => {
  // 获取chunklist
  const {fileChunkList} = e.data;
  const spark = new self.SparkMD5.ArrayBuffer();
  let percentage = 0;  // 记录进度
  let count = 0;  // 记录已经计算过的chunk数量
  // 定义计算函数
  const nextLoad = index => {
    const reader = new FileReader();
    // 读取chunk
    reader.readAsArrayBuffer(fileChunkList[index].chunk);
    reader.onload = e => {
      // 更新数量
      count++;
      // 合并hash
      spark.append(e.target.result);

      if(count === fileChunkList.length) {  // 如果count等于chunk list长度的时候，代表计算结束
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close()  // 关闭线程
      }else {
        // 更新进度
        percentage += 100 / fileChunkList.length;
        self.postMessage({
          percentage
        });
        // 递归调用，继续计算
        nextLoad(count);
      }
    }
  }

  // 开始计算
  nextLoad(0)
}
