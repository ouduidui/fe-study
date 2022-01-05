export const DEFAULT_SIZE = 10 * 1024 * 1024;   // 默认切片大小
import {calculateHash} from './calculateHash';

/**
 * 生成文件切片
 * @param file {File}
 * @param size {number}
 * @return {Array<{chunk: File, hash: string}>}
 */
export async function createFileChunks(file, size = DEFAULT_SIZE) {
  const fileChunkList = [];

  let curSize = 0;
  while (curSize < file.size) {
    fileChunkList.push({
      chunk: file.slice(curSize, curSize + size),
      hash: file.name + '-' + (fileChunkList.length)
    });
    curSize += size;
  }

  // 计算出文件的hash
  const fileHash = await calculateHash(fileChunkList);

  fileChunkList.forEach((item, index) => {
    item.fileHash = fileHash;
    item.hash = fileHash + '-' + index
  })

  return fileChunkList;
}
