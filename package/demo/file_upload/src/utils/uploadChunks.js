import request from "./request";
import {DEFAULT_SIZE} from "./createFileChunks";

const cancelList = [];

/**
 *
 * @param chunks {Array<{chunk: File, hash: string}>}
 * @param filename {string}
 * @param fileHash {string}
 * @param progress {Ref<[]>}
 * @return {Promise<{isSuccess: boolean, message: string}>}
 */
export const uploadChunks = async (chunks, filename, fileHash, progress) => {
  const isUploaded = await verifyRequest(fileHash);

  if (isUploaded) {
    progress.value = [1];
    return {  // 秒传成功
      isSuccess: true,
      message: '秒传成功'
    }
  }

  progress.value = new Array(chunks.length).fill(0);
  const requestList = chunks.map(({chunk, hash}) => {
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
      onUploadProgress: (event) => {
        progress.value[index] = event.loaded / event.total;
      }
    }, cancelList)
  })

  const res = await Promise.all(requestList);
  if (res.every(r => r.status === 200 && r.data.code === 1)) {
    const isSuccess = await mergeRequest(filename, fileHash, DEFAULT_SIZE);

    if (isSuccess) {
      return {
        isSuccess: true,
        message: '上传成功'
      }
    }
  }

  return {
    isSuccess: false,
    message: '上传失败'
  }
}

/**
 * 合并请求
 * @param filename {string}
 * @param fileHash {string}
 * @param size {number}
 * @return {Promise<*>}
 */
const mergeRequest = async (filename, fileHash, size) => {
  const {status, data} = await request({
    url: '/api/merge',
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    data: {filename, fileHash, size}
  })

  return status === 200 && data.code === 1;
}

const verifyRequest = async (fileHash) => {
  const {status, data} = await request({
    url: '/api/verify',
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    data: {fileHash}
  })
  return status === 200 && data.code === 1;
}

export const cancelUpload = () => {
  cancelList.forEach(item => item.cancel());
}

