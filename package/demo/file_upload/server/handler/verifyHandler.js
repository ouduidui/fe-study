const {CHUNKS_PATH, FILES_MAP_PATH} = require('../utils/config')
const fs = require("fs");

/**
 * 检验是否已经上传
 * @param fileHash
 * @return {{count: number, type: number}|{type: number}}
 */
const verifyHandler = ({fileHash}) => {
  const fileMapStr = fs.readFileSync(FILES_MAP_PATH, 'utf-8');
  const fileMap = fileMapStr ? JSON.parse(fileMapStr) : {};

  // 文件已经上传过
  if (fileMap[fileHash]) return {type: 1}

  // 存在该文件的chunks
  const chunksPath = fs.readdirSync(CHUNKS_PATH);
  if (chunksPath.includes(fileHash)) {
    const chunks = fs.readdirSync(CHUNKS_PATH + `/${fileHash}`);
    return {
      type: 2,
      count: chunks.length  // 已上传的数量
    }
  }

  // 无上传过
  return {type: 0}
}

module.exports = verifyHandler
