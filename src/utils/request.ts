import axios from 'axios';

let pending: any[] = [];
const CancelToken: any = axios.CancelToken;

const removePending: any = (config: any, f: any) => {
  const flagUrl = config.url;

  if (pending.indexOf(flagUrl) !== -1) {
    if (f) {
      f('取消重复请求');
    } else {
      pending.splice(pending.indexOf(flagUrl), 1);
    }
  } else {
    if (f) {
      pending.push(flagUrl);
    }
  }
}

const service = axios.create({
  baseURL: 'http://192.168.1.101:8089',
  timeout: 5000,
});

service.interceptors.request.use((config: any) => {
  if (!config.neverCancel) {
    config.cancelToken = new CancelToken((c: any) => {
      removePending(config, c);
    });
  }

  // console.log(config);
  // localStorage.getItem('iot_token');

  if (sessionStorage.getItem('iot_token')) {
    config.headers['token'] = sessionStorage.getItem('iot_token');
  }

  return config;
}, (error: any) => {
  Promise.reject(error);
});

service.interceptors.response.use((response: any) => {
  removePending(response.config);
  const res = response.data;
  if (res.code !== 20200) {
    if (res.code === 20404) {
      if (location.hash === '#/') {
        return res;
      } else {
        location.href = '/#/';
      }
    }
    return Promise.reject('error');
  } else {
    return response;
  }
}, (error: any) => {
  pending = [];
  if (error.message == '取消重复请求') {
    return Promise.reject(error);
  }
  return Promise.reject(error);
})

export default service;

