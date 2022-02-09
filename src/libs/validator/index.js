/**
 * 规则验证
 */

// 统一社会信用代码
export const socialCreditCodeReg = () => {
  // 目前只验证18位字母+数字
  return /^[A-Za-z0-9]{18}$/;
};

// 手机号
export const mobileReg = () => {
  return /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
};

// 邮箱
export const emailReg = () => {
  return /^[a-zA-Z\-_0-9]+@[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+$/;
};

// 身份证
export const idNoReg = () => {
  return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
};