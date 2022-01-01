const fs = require('fs');
const path = require('path');
const pipeStream = require('../utils/pipeStream')
const {CHUNKS_PATH, FILES_PATH} = require('../utils/config')

const mergeHandler = async (filename) => {
  const chunkDir = path.resolve(CHUNKS_PATH, filename);
  const chunkPaths = fs.readdirSync(chunkDir);

  chunkPaths.sort((a, b) => {
    const aArr = a.split('-');
    const bArr = b.split('-');
    return aArr[aArr.length - 1] - bArr[bArr.length - 1];
  })

  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      pipeStream(path.resolve(chunkDir, chunkPath), FILES_PATH + '/' + filename)
    })
  )

  removeDir(chunkDir)
}

const removeDir = (dirPath) => {
  // 读取文件夹
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    fs.unlinkSync(dirPath + '/' + file);
  })

  fs.rmdirSync(dirPath);
}

module.exports = mergeHandler;
