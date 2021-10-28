const fs = require('fs');
const path = require('path');

/**
 * 文件保存
 * @param file
 * @param filename
 * @return {Promise<*>}
 */
exports.saveFile = (file, filename) => {
  const savePath = path.resolve(__dirname, '../files/');
  return saveHandle(file, savePath, filename || file.name);
};

/**
 * 切片文件保存
 * @param file
 * @param hash
 * @param index
 * @param filename
 * @return {Promise<*>}
 */
exports.saveSliceFile = (file, hash, index, filename) => {
  const savePath = path.resolve(__dirname, `../files/hash/${hash}`);
  return saveHandle(file, savePath, `${hash}-${index}`);
}

exports.mergeFile = (hash) => {
  const chunkDir = path.resolve(__dirname, `../files/hash/${hash}`);
  let chunks = fs.readdirSync(chunkDir);
  chunks.sort((a, b) => a.split('-')[1] - b.split('-')[1]);
  chunks = chunks.map(cp => path.resolve(chunkDir, cp));

  const pipStream = (filePath, writeStream) => new Promise(resolve => {
    const readStream = fs.createReadStream(filePath);
    readStream.on()
  })
}

/**
 * 文件保存动作
 * @param file
 * @param savePath
 * @param filename
 * @return {Promise<unknown>}
 */
const saveHandle = (file, savePath, filename) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(savePath)) fs.mkdirSync(savePath);

    const readStream = fs.createReadStream(file.path);
    const writeStream = fs.createWriteStream(`${savePath}/${filename}`);
    readStream.pipe(writeStream);

    readStream.on("error", (err) => {
      console.log("发生异常：" + err.message);
      reject(err.message);
    });
    readStream.on("ready", () => console.log("文件已准备好.."));
    readStream.on("open", (fd) => console.log("文件已打开：" + fd));
    readStream.on("data", (chunk) => console.log("读取文件数据..."));
    readStream.on("end", () => console.log("读取已完成.."));
    readStream.on("close", () => {
      console.log("文件已关闭！")
      resolve('上传成功');
    });
  })
}
