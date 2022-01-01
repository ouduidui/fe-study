const DEFAULT_SIZE = 1 * 1024 * 1024;   // 默认切片大小

/**
 * 生成文件切片
 * @param file {File}
 * @param size {number}
 * @return {Array<{chunk: File, hash: string}>}
 */
const createFileChunks = (file, size = DEFAULT_SIZE) => {
  const fileChunkList = [];

  let curSize = 0;
  while (curSize < file.size) {
    fileChunkList.push({
      chunk: file.slice(curSize, curSize + size),
      hash: file.name + '-' + (fileChunkList.length)
    });
    curSize += size;
  }

  return fileChunkList;
}

export default createFileChunks;
