/**
 * 与业务相关的工具类
 */
import _ from 'underscore';
import store from '@/store';
import router from '@/router/';
import sessionStorage from '@/libs/sessionStorage';

/**
 * **********************
 * change route
 * **********************
 */

/**
 * go to index page
 */
export const goHome = () => {
  router.push({ name: 'index' });
};

/**
 * **********************
 * store & get storage
 * **********************
 */

/**
 * store user into storage
 * @param {Object} userInfo user info
 */
export const storeUserInfotoStorage = userInfo => {};

/**
 * store user into vuex
 * @param {Object} userInfo user info
 */
export const storeUserInfotoVuex = userInfo => { };

/**
 * clear local storage
 */
export const clearStorage = () => {
  sessionStorage.clear();
  store.commit('clearLocalStorage');
};

/**
 * clear local storage
 */
export const removeStorage = () => {
  sessionStorage.clear();
};

/**
 * handle api authority
 * @description add flag 'auth' filed to recognize if this api needs to be validated by token
 * @param {Object} apis 接口配置
 * @param {boolean} defaultAuth 默认权限（true：需要token | false：不需要token）
 */
export const formatApiAuth = (apis, defaultAuth = true) => {
  if (!apis) return;

  _.map(apis, api => {
    !('auth' in api) && (api['auth'] = defaultAuth);
  });

  return apis;
};
