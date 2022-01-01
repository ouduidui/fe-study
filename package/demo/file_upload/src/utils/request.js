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
 * @return {Promise<*>}
 */
const request = ({url, method = 'GET', headers = {}, data = null}) => {
  return new Promise((resolve, reject) => {
    try {
      axios({
        url,
        method,
        headers,
        data
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
