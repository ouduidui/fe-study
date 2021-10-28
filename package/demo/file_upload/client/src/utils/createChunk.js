const CHUNK_SIZE = 1 * 1024 * 1024; // 0.5M
const CHUNK_OFFSET_SIZE = 2 * 1024 * 1024;  // 2M

/**
 * 将文件平分生成chunks
 * @param file {File} 文件
 * @param size {number} 单个Chunk的大小，默认为1M
 * @return {Blob[]}
 */
export const createFileChunk = (file, size = CHUNK_SIZE) => {
  const chunks = [];
  let cur = 0;
  while (cur < file.size) {
    chunks.push({
      index: cur,
      file: file.slice(cur, cur + CHUNK_SIZE)
    })
    cur += CHUNK_SIZE;
  }

  return chunks;
}

/**
 * 将文件抽样生成Chunks
 * @desc 文件头尾取offset大小的Chunk，中间每一个offset单位内首尾和中间各取2字节的Chunk
 * @param file {File} 文件
 * @param offset {number} 默认为2M
 * @return {Blob[]}
 */
export const createFileSampleChunk = (file, offset = CHUNK_OFFSET_SIZE) => {
  const size = file.size;

  const chunks = [file.slice(0, offset)];

  let cur = offset;
  while (cur < size) {
    if (cur + offset >= size) {
      chunks.push(file.slice(cur, cur + offset));
    } else {
      const mid = cur + offset / 2;
      const end = cur + offset;
      chunks.push(file.slice(cur, cur + 2));
      chunks.push(file.slice(mid, mid + 2));
      chunks.push(file.slice(end - 2, end));
    }
    cur += offset;
  }

  return chunks;
}

/**
 * 生成文件上传切片（包含文件Hash）
 * @param file {File}
 * @param hash {string}
 * @param size {number}
 * @return {*[]}
 */
export const createUploadChunk = (file, hash, size = CHUNK_SIZE) => {
  const chunks = [];
  let cur = 0;
  let index = 1;
  while (cur < file.size) {
    chunks.push({
      hash,
      name: file.name,
      index: index++,
      file: file.slice(cur, cur + CHUNK_SIZE)
    })
    cur += CHUNK_SIZE;
  }

  return chunks;
}

