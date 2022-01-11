import request from "./request";
import {DEFAULT_SIZE} from "./createFileChunks";
import {ref} from "vue";

// 存储请求实例集合，用于暂停上传
const cancelList = [];

// 上传进度 响应式数据
export const uploadProgress = ref([])

/**
 * chunks上传
 * @param chunks {Array<{chunk: File, hash: string}>}
 * @param filename {string}
 * @param fileHash {string}
 * @return {Promise<{isSuccess: boolean, message: string}>}
 */
export const uploadChunks = async (chunks, filename, fileHash) => {
  // 重置上传进度
  uploadProgress.value = [];

  // 验证是否已经上传
  const verifyRes = await verifyRequest(fileHash);

  if (verifyRes.code === 1) {  // 当code等于1时，代表文件已经成功上传过，无需再次上传
    uploadProgress.value = [1];
    return {  // 秒传成功
      isSuccess: true,
      message: '秒传成功'
    }
  } else {  // code不等于1时，代表还需要上传chunk
    // 因此可以通过verifyRes.data.count判断已经上传的chunks数量，如果为0的话代表还未上传过
    const uploadedCount = verifyRes.data.count || 0;

    // 初始化上传进度
    uploadProgress.value = new Array(chunks.length).fill(0);

    // 创建上传集合
    const requestList = chunks.map(({chunk, hash}) => {
      // 建立formData，存储文件
      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('hash', hash);
      formData.append('fileHash', fileHash);
      formData.append('filename', filename);

      return formData;
    }).map((formData, index) => {
      if(index < uploadedCount) {  // 如果index小于uploadedCount，代表该chunk已经上传过了，就无需再上传
        // 更新状态
        uploadProgress.value[index] = 1;
        // 返回一个空的promise
        return Promise.resolve('blank_promise');
      }else {
        // 创建上传示例
        return request({
          url: '/api/upload',
          data: formData,
          method: 'POST',
          // 记录上传进度
          onUploadProgress: (event) => {
            uploadProgress.value[index] = event.loaded / event.total;
          }
        }, cancelList)
      }
    })

    // 使用Promise.all统一处理请求清单
    const res = await Promise.all(requestList);

    // 判断是否所有请求都成功
    if (res.every(r => r === 'blank_promise' || (r.status === 200 && r.data.code === 1))) {
      // 如果全都上传成功的话，则向服务器发送合并信号
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

/**
 * 请求接口，判断是否引进上传过
 * @param fileHash
 * @return {Promise<boolean|*>}
 */
const verifyRequest = async (fileHash) => {
  const {status, data} = await request({
    url: '/api/verify',
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    data: {fileHash}
  })

  if (status === 200) {
    return data;
  } else {
    return false;
  }
}

export const cancelUpload = () => {
  cancelList.forEach(item => item.cancel());
  cancelList.length = 0;
}

