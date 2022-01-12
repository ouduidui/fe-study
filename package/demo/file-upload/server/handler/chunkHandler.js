const fs = require('fs');
const path = require('path');
const pipeStream = require('../utils/pipeStream');

const { CHUNKS_PATH } = require('../utils/config');

/**
 * chunks存储处理
 * @param req
 * @return {Promise<*>}
 */
const chunkHandler = async (req) => {
  const { body, files } = req;
  const { chunk } = files;
  const { hash, fileHash } = body;
  const chunkDir = path.resolve(CHUNKS_PATH, fileHash);

  // 如果没有该文件夹则新建
  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir);
  }

  // 通过读写流的方式进行存储
  return await pipeStream(chunk.path, fs.createWriteStream(chunkDir + '/' + hash));
};

module.exports = chunkHandler;
