
/**
 * CAS流程接口
 * @description 该接口只提供WEB端处理CAS的流程，具体实现根据实际业务逻辑扩展
 * @author Lizzie
 * @version v1.0.0
 */

export default class CASInterface {
  /**
   * **************
   * 登录及缓存流程
   * **************
   */

  /**
   * 前往登录页
   * @param {string} url 登录页地址
   */
  gotoLogin(url) { }

  /**
   * 解析登录返回参数
   * @param {string} param 参数（加密）
   * @returns 解析结果
   */
  parseLoginParam(param) { }

  /**
   * 缓存登录解析结果
   * @param {*} param 需要缓存的参数
   */
  storeLoginParam(param) { }

  /**
   * 缓存登录时间
   * @param {number} time 登录时间
   */
  storeLoginTime(time) { }

  /**
   * ****************
   * 退出登录
   * ****************
   */

  /**
   * 前往退出页
   * @param {string} url 登录页地址
   */
  gotoLogout(url) { }

  /**
   * 退出回调
   * @param {boolean} isSuccess 是否退出成功
   */
  logout(isSuccess) { }

  /**
   * ****************
   * 前端token、API过期验证及操作
   * ****************
   */

  /**
   * 校验token有效性
   */
  checkToken() { }

  /**
  * 检验token过期
  */
  checkTokenIsExpired() { }

  /**
   * 过期操作
   */
  expireAction() { }
}
