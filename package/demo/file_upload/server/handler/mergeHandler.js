const fs = require('fs');
const path = require('path');
const pipeStream = require('../utils/pipeStream')
const {CHUNKS_PATH, FILES_PATH, FILES_MAP_PATH} = require('../utils/config')

const DEFAULT_SIZE = 1 * 1024 * 1024;   // 默认切片大小

const mergeHandler = async ({filename, fileHash, size = DEFAULT_SIZE}) => {
  const chunkDir = path.resolve(CHUNKS_PATH, fileHash);
  const chunkPaths = fs.readdirSync(chunkDir);

  chunkPaths.sort((a, b) => {
    const aArr = a.split('-');
    const bArr = b.split('-');
    return aArr[aArr.length - 1] - bArr[bArr.length - 1];
  })

  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      pipeStream(path.resolve(chunkDir, chunkPath), fs.createWriteStream(FILES_PATH + '/' + filename, {
        start: index * size,
        end: (index + 1) * size
      }))
    })
  )

  removeDir(chunkDir)
  updateFileMap(filename, fileHash)
}

const updateFileMap = (filename, fileHash) => {
  const fileMapStr = fs.readFileSync(FILES_MAP_PATH, 'utf-8');
  const fileMap = fileMapStr ?  JSON.parse(fileMapStr) : {};
  fileMap[fileHash] = filename;
  fs.writeFileSync(FILES_MAP_PATH, JSON.stringify(fileMap, null, 2))
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
