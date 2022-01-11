import {calculateHash} from './calculateHash';

export const DEFAULT_SIZE = 10 * 1024 * 1024;   // 默认切片大小

/**
 * 生成文件切片
 * @param file {File}
 * @param size {number}
 * @return {Array<{chunk: File, hash: string}>}
 */
export async function createFileChunks(file, size = DEFAULT_SIZE) {
  // 初始化list
  const fileChunkList = [];

  // 计算当前生成chunks的累计大小
  let curSize = 0;
  // 当curSize还小于文件大小的时候，继续切分
  while (curSize < file.size) {
    fileChunkList.push({
      chunk: file.slice(curSize, curSize + size),  // 通过file自带的slice方法进行切割
    });
    // 更新curSize
    curSize += size;
  }

  // 计算出文件的hash
  const fileHash = await calculateHash(fileChunkList);

  // 将hash更新到每个chunk中
  fileChunkList.forEach((item, index) => {
    item.hash = fileHash + '-' + index
  })

  return {
    fileChunkList,
    fileHash
  };
}
