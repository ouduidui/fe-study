const path = require('path');

module.exports = {
  CHUNKS_PATH: path.resolve(__dirname, '../target/chunks'),
  FILES_PATH: path.resolve(__dirname, '../target/files'),
  FILES_MAP_PATH: path.resolve(__dirname, '../target/file_map.json')
};
