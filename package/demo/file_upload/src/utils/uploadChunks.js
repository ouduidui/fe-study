import request from "./request";

/**
 *
 * @param chunks {Array<{chunk: File, hash: string}>}
 * @param filename {string}
 * @return {Promise<void>}
 */
const uploadChunks = async (chunks, filename) => {
  const requestList = chunks.map(({chunk, hash}) => {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('hash', hash);
    formData.append('filename', filename)
    return formData;
  }).map(formData => {
    return request({
      url: '/api/upload',
      data: formData,
      method: 'POST'
    })
  })

  await Promise.all(requestList);
  await mergeRequest(filename);
}

/**
 * 合并请求
 * @param filename
 * @return {Promise<*>}
 */
const mergeRequest = async (filename) => {
  return await request({
    url: '/api/merge',
    method: 'POST',
    headers: {
      "content-type": "application/json"
    },
    data: {filename}
  })
}

export default uploadChunks;
