import Axios from 'axios';
import _ from 'underscore';
import { STATUS_CODE } from './libs';
import storage from "@/libs/sessionStorage";
import CAS from '@/libs/CASProcess/';
import apis from '@/apis/';
import config from '@/config';
const { isCAS, authStrict = false } = config;

const BASEURL = window.global['apiUrl'];
const TIMEOUT = window.global['timeout'];
const StatusCodeKey = "statusCode";

/**
 * 更新token过期时间
 */
const checkExpire = (response = {}) => {
  // 无需CAS
  if (!isCAS) {
    return response;
  }

  // 需要CAS
  const { config, data = {} } = response;
  const { auth = true } = config;
  const { code = 0 } = data || {};

  // 登录失效状态码
  const tokenExpireCode = STATUS_CODE.token;

  // 需要token验证且请求非失效
  auth && Number(code) !== tokenExpireCode && CAS.storeLoginTime();

  return response;
};

/**
 * 检查Request请求状态
 * @param {Object} response
 * @return {*}
 */
const checkStatus = (response = {}) => {
  if (!response) return {};

  const {
    status,
    statusText,
    data,
    config
  } = response;
  // 接口是否需要token验证
  const { auth = false } = config;

  // 非严格模式下，配置了auth=true的接口只在request拦截器中验证token有效性，在响应中收全局token失效操作影响
  if (status === 200 || status === 304) return !authStrict ? data : { ...data, _auth: auth };

  if (status === 401 && isCAS) CAS.expiredAPIIntercepors();

  let message = status === 401 ? '登录失效，请重新登录' : '访问异常';

  return {
    code: status,
    message,
    data: statusText,
    _auth: auth
  };
};

/**
 * 检查Response返回结果
 * @param {Object} result result
 * @return {*}
 */
const checkResult = result => {
  // 是否需要token验证
  const { _auth = false } = result;
  const code = result[StatusCodeKey] || "0";
  
  if (code === STATUS_CODE.succsess) {
    // 加载动画
    // Loading.close()
    // 状态码过滤
    // 成功
  } else {

    // 失败
    if (code === STATUS_CODE.token) {
      // 登录失效
      if (authStrict && !_auth) return;

      // todo，比如可以回首页
    }
  }
  return result;
};


/**
 * 装载headers
 * @param {object} initOps 自定义请求头参数
 * @param {object} initOps.headers 自定义头部
 */
const uploadHeaders = initOps => {
  return initOps['headers'] && typeof initOps.headers === 'object'
    ? initOps.headers
    : {
      'content-type': 'application/json',
      apiToken: storage.get('token') || ''
    };
};

/* Axios config */
Axios.defaults.baseURL = BASEURL;

/**
 * request interceptors
 */
Axios.interceptors.request.use(
  config => {
    // 非CAS
    if (!isCAS) return config;

    // CAS
    const { auth } = config;

    // 无需token
    if (!auth) return config;

    // token验证
    return CAS.checkToken() ? config : {};
  },
  error => Promise.reject(error)
);

/**
 * response interceptors
 */
Axios.interceptors.response.use(
  response => response,
  error => Promise.resolve(error.response)
);

let request = {};

_.map(apis, (val, key) => {
  _.map(val, v => {
    // api config
    const {
      name,
      url,
      method,
      auth = true
    } = v;

    request[`${key}_${name}`] = (data, initOps = {}) => {
      let options = {
        method,
        url,
        headers: uploadHeaders(initOps),
        auth
      };

      // handle timeout
      TIMEOUT && (options['timeout'] = TIMEOUT);

      // handle get or post params
      options[method === 'get' ? 'params' : 'data'] = data;

      // agree params and data simultaneous existence
      initOps['params'] && (options['params'] = initOps.params);

      return (
        Axios(options)
          .then(checkExpire)
          .then(checkStatus)
          .then(checkResult)
          .catch(e => {
            if (e.message === 'interrupt') {
              console.log('已中断请求');
              return;
            }
          })
      );
    };
  });
});

export default request;
