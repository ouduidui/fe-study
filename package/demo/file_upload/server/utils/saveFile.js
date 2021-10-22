const { rejects } = require('assert');
const fs = require('fs');
const path = require('path');

exports.saveFile = (file, filename) => {
  return new Promise((resolve, rejects) => {
    if (!file) return;

    const savePath = path.resolve(__dirname, `../files/${file.name}`);
    const readStream = fs.createReadStream(file.path);
    const writeStream = fs.createWriteStream(savePath);
    readStream.pipe(writeStream);
  
    readStream.on("error", (err) => {
      console.log("发生异常：" + err.message);
      rejects(err.message);
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
};