const fs = require('fs');

/**
 * 使用流进行读写
 * @param readrPath {string}
 * @param writeStream {*} 写入流
 * @return {Promise<unknown>}
 */
const pipeStream = (readrPath, writeStream) => {
  return new Promise((resolve, reject) => {
    // 创建读取流
    const readStream = fs.createReadStream(readrPath);
    readStream.pipe(writeStream);

    readStream.on('error', (err) => {
      console.log('发生异常：' + err.message);
      reject(false);
    });
    readStream.on('ready', () => console.log('文件已准备好..'));
    readStream.on('open', (fd) => console.log('文件已打开：' + fd));
    readStream.on('data', (chunk) => console.log('读取文件数据...'));
    readStream.on('end', () => console.log('读取已完成..'));
    readStream.on('close', () => {
      console.log('文件已关闭！');
      resolve(true);
    });
  });
};

module.exports = pipeStream;
