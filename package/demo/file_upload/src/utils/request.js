import axios from "axios";

// 拦截器
axios.interceptors.response.use(
  res => Promise.resolve(res),
  err => Promise.reject(err.response)
);

/**
 * 请求接口
 * @param url {string}
 * @param method {'GET' | 'POST'}
 * @param headers {*}
 * @param data {*}
 * @param onDownloadProgress {Function}
 * @return {Promise<*>}
 */
const request = ({url, method = 'GET', headers = {}, data = null, onDownloadProgress = () => {}}) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url,
        method,
        headers,
        data,
        onDownloadProgress
      })
        .then(res => {
          resolve(res);
        }).catch(err => {
        reject(err);
      })
    } catch (e) {
      reject(e);
    }
  })
}

export default request;
