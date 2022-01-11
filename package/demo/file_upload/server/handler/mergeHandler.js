const fs = require('fs');
const path = require('path');
const pipeStream = require('../utils/pipeStream')
const {CHUNKS_PATH, FILES_PATH, FILES_MAP_PATH} = require('../utils/config')

const DEFAULT_SIZE = 1 * 1024 * 1024;   // 默认切片大小

/**
 * 合并处理
 * @param filename
 * @param fileHash
 * @param size
 * @return {Promise<void>}
 */
const mergeHandler = async ({filename, fileHash, size = DEFAULT_SIZE}) => {
  // 获取chunks文件
  const chunkDir = path.resolve(CHUNKS_PATH, fileHash);
  const chunkPaths = fs.readdirSync(chunkDir);

  // 排序
  chunkPaths.sort((a, b) => {
    const aArr = a.split('-');
    const bArr = b.split('-');
    return aArr[aArr.length - 1] - bArr[bArr.length - 1];
  })

  await Promise.all(
    chunkPaths.map((chunkPath, index) => {
      // 通过读写流的方式进行合并
      pipeStream(path.resolve(chunkDir, chunkPath), fs.createWriteStream(FILES_PATH + '/' + filename, {
        start: index * size,
        end: (index + 1) * size
      }))
    })
  )

  // 删除chunks文件
  removeDir(chunkDir)
  // 更新文件Hash映射表
  updateFileMap(filename, fileHash)
}

/**
 * 更新文件Hash映射表
 * @param filename
 * @param fileHash
 */
const updateFileMap = (filename, fileHash) => {
  const fileMapStr = fs.readFileSync(FILES_MAP_PATH, 'utf-8');
  const fileMap = fileMapStr ?  JSON.parse(fileMapStr) : {};
  fileMap[fileHash] = filename;
  fs.writeFileSync(FILES_MAP_PATH, JSON.stringify(fileMap, null, 2))
}

/**
 * 删除文件夹
 * @param dirPath
 */
const removeDir = (dirPath) => {
  // 读取文件夹
  const files = fs.readdirSync(dirPath);
  // 清空文件夹里面的内容
  files.forEach((file) => {
    fs.unlinkSync(dirPath + '/' + file);
  })

  // 删除文件夹
  fs.rmdirSync(dirPath);
}

module.exports = mergeHandler;
