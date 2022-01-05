const fs = require('fs');
const path = require('path')
const pipeStream = require('../utils/pipeStream')

const {CHUNKS_PATH} = require('../utils/config')

const chunkHandler = async (req) => {
  const {body, files} = req;
  const {chunk} = files;
  const {filename, hash} = body;
  const chunkDir = path.resolve(CHUNKS_PATH, filename);

  if (!fs.existsSync(chunkDir)) {
    fs.mkdirSync(chunkDir)
  }

  return await pipeStream(chunk.path, fs.createWriteStream(chunkDir + '/' + hash));
}

module.exports = chunkHandler;
