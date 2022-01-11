const {CHUNKS_PATH, FILES_MAP_PATH} = require('../utils/config')
const fs = require("fs");

const verifyHandler = ({fileHash}) => {
  const fileMapStr = fs.readFileSync(FILES_MAP_PATH, 'utf-8');
  const fileMap = fileMapStr ?  JSON.parse(fileMapStr) : {};
  return !!fileMap[fileHash]
}

module.exports = verifyHandler
