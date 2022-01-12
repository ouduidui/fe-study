import axios from 'axios';

// 拦截器
axios.interceptors.response.use(
  (res) => Promise.resolve(res),
  (err) => Promise.reject(err.response)
);

// 取消请求
const CancelToken = axios.CancelToken;

/**
 * 请求接口
 * @param url {string}
 * @param method {'GET' | 'POST'}
 * @param headers {*}
 * @param data {*}
 * @param onUploadProgress {Function}
 * @param requestList
 * @param cancelList {[]}
 * @return {Promise<*>}
 */
const request = ({ url, method = 'GET', headers = {}, data = null, onUploadProgress = () => {} }, requestList) => {
  return new Promise((resolve, reject) => {
    try {
      // 存储取消请求函数
      let cancel;
      const _request = axios({
        url,
        method,
        headers,
        data,
        onUploadProgress,
        // 创建cancelToken
        cancelToken: new CancelToken((Canceler) => (cancel = Canceler))
      })
        .then((res) => {
          // 如果请求成功的话，从集合中删除
          if (requestList) {
            const idx = requestList.findIndex((item) => item.instance === _request);
            requestList.splice(idx, 1);
          }

          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });

      // 存储实例和取消函数
      requestList &&
        requestList.push({
          instance: _request,
          cancel: cancel
        });
    } catch (e) {
      reject(e);
    }
  });
};

export default request;
