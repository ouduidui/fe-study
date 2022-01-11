import axios from "axios";

// 拦截器
axios.interceptors.response.use(
  res => Promise.resolve(res),
  err => Promise.reject(err.response)
);

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
const request = ({
                   url,
                   method = 'GET',
                   headers = {},
                   data = null,
                   onUploadProgress = () => {
                   }
                 }, requestList) => {
  return new Promise((resolve, reject) => {
    try {
      let cancel;
      const _request = axios({
        url,
        method,
        headers,
        data,
        onUploadProgress,
        cancelToken: new CancelToken((Canceler) => cancel = Canceler)
      })
        .then(res => {
          if (requestList) {
            const idx = requestList.findIndex(item => item.instance === _request);
            requestList.splice(idx, 1);
          }

          resolve(res);
        }).catch(err => {
          reject(err);
        });

      requestList && requestList.push({
        instance: _request,
        cancel: cancel
      });
    } catch (e) {
      reject(e);
    }
  })
}

export default request;
