import request from "./request";
import {DEFAULT_SIZE} from "./createFileChunks";


/**
 *
 * @param chunks {Array<{chunk: File, hash: string}>}
 * @param filename {string}
 * @return {Promise<void>}
 */
export const uploadChunks = async (chunks, filename) => {
  let _fileHash;
  const requestList = chunks.map(({chunk, hash, fileHash}) => {
    if (!_fileHash) _fileHash = fileHash;

    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash);
    formData.append('fileHash', fileHash);
    formData.append('filename', filename)
    return formData;
  }).map((formData, index) => {
    return request({
      url: '/api/upload',
      data: formData,
      method: 'POST',
      onDownloadProgress: (event) => {
        console.log(event.loaded, event.total)
      }
    })
  })

  await Promise.all(requestList);
  await mergeRequest(filename, _fileHash, DEFAULT_SIZE);
}

/**
 * 合并请求
 * @param filename {string}
 * @param fileHash {string}
 * @param size {number}
 * @return {Promise<*>}
 */
const mergeRequest = async (filename, fileHash, size) => {
  return await request({
    url: '/api/merge',
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    data: {filename, fileHash, size}
  })
}

