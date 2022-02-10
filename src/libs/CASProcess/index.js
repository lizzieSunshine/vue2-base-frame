import store from '@/store';
import storage from '@/libs/sessionStorage';
import CASInterface from './CASInterface';
import { Message } from 'element-ui';
import {
  goHome,
  storeUserInfotoVuex,
  clearStorage,
  removeStorage
} from '@/libs/tools';

/**
 * CAS流程
 * 该版本CAS具体注意点如下（不同系统可根据实际业务逻辑进行修改）：
 * 1. 登录、退出地址统一配置到window.global之下
 * 2. 登录时间会缓存到sessiontorage之中，如需修改请参考storeLoginTime方法
 * 3. 登录时间会单独存储一份到storage下，用户接口请求成功更新处，记录的是最新的有效起始时间；userinfo中记录的是每次登录操作的时间，用于备份
 */
class CASProcess extends CASInterface {
  constructor() {
    super();
    // 登录地址
    this.loginUrl = window.global['loginUrl'];
    // 注销地址
    this.loginoutUrl = window.global['loginOut'];
    // 过期时间
    this.timeout = window.global['timeOut'];
  }

  /**
   * **************
   * 登录及缓存流程
   * **************
   */

  /**
   * 前往登录页
   * @param {string} target window.open打开方式
   */
  gotoLogin(target = '_self') {
    if (!this.loginUrl) {
      Message.warning('缺失登录地址');
      return;
    };
    
    window.open(this.loginUrl, target);
  }

  /**
   * 解析登录返回参数
   * @param {string} param 参数（加密）
   * @returns {Object} 解密JSON字符串
   */
  parseLoginParam(param) { }

  /**
   * 缓存登录解析结果
   * @param {Object} param 需要缓存的参数
   * @param {number} param.loginTime 登录时间
   * @param {string} param.userInfo 用户信息
   */
  storeLoginParam({ loginTime, userInfo }) { }

  /**
   * 缓存登录时间
   */
  storeLoginTime(time = new Date().getTime()) { }

  /**
   * 缓存登录解析结果到浏览器缓存
   */
  storeInfotoStorage = ({ loginTime, userInfo }) => { }

  /**
   * 解析参数并缓存
   * @param {string} param 加密用户信息
   */
  loginParseAndStore(param) { }

  /**
   * ****************
   * 退出登录
   * ****************
   */

  /**
   * 前往退出页
   */
  gotoLogout() {
    window.open(this.loginoutUrl, '_self');
  }

  /**
   * 退出并返回首页
   * @param {boolean} isSuccess 是否退出成功
   */
  logout(isSuccess) { }

  /**
   * ****************
   * 前端token、API过期验证及操作
   * ****************
   */

  /**
   * 校验token
   * @param {boolean} needsGoHome 是否需要回到首页
   * @description 校验token是否存在；校验token是否过期
   */
  checkToken(needsGoHome = false) { }

  /**
   * 检验token过期
   * @description 通过校验当前时间-上次登录时间是否在有效期内判断token是否过期
   * @param {number} validTime 有效期（毫秒）
   * @param {number} loginTime 上一次登录时间
   * @returns {boolean} 是否过期（true：过期 | false：未过期）
   */
  checkTokenIsExpired() { }

  /**
   * 过期操作
   * @param {string} title 提示标题
   * @param {string} type 提示类型
   */
  expireAction(title, type = 'message') { }

  /**
   * ****************
   * 路由 | 接口拦截
   * ****************
   */

  /**
   * 路由拦截器
   * @param {Object} to router.to
   * @param {Object} from router.from
   * @param {Function} next router.next
   */
  routerInterceptors(to, from, next) {
    next();
  }

  /**
   * 过期接口拦截器
   */
  expiredAPIIntercepors() { };

  /**
   * ****************
   * 外部操作快捷方式
   * ****************
   */

  // 获取登录时间
  getLoginTime = (k = 'time') => { };
}

export default new CASProcess();