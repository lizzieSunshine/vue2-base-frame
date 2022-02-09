/**
 * 与业务无关的工具类
 */
import JsEncrypt from 'jsencrypt';
import config from '@/config/';

/**
 * RSA加密
 * @param {string} pas 需要被加密的对象
 * @returns 加密结果
 */
export const RSAencrypt = (pas) => {
  let publicKey = config.jsencryptPublicKey;
  let jse = new JsEncrypt();
  jse.setPublicKey(publicKey);

  return jse.encrypt(pas);
};

/**
 * RSA解密
 * @param {string} val 需要被解密的对象
 * @returns 解密结果
 */
export const RSAdecrypt = (val) => {
  const privateKey = config.jsencryptPrivateKey;
  let jse = new JsEncrypt();
  jse.setPrivateKey(privateKey);

  return jse.decrypt(val);
};

/**
 * forEach array
 * @param {Array} arr array
 * @param {Function} fn callback
 */
export const forEach = (arr, fn) => {
  if (!arr.length || !fn) return;
  let i = -1;
  const len = arr.length;
  while (++i < len) {
    const item = arr[i];
    fn(item, i, arr);
  }
};

/**
 * get label from enumeration
 * @param {string} val value
 * @param {Array} enums enumeration
 * @param {string} type type of val
 * @return {string} label
 */
export const getLabelFromEnum = (val, enums, type) => {
  for (let i = 0; i < enums.length; i++) {
    const item = enums[i];
    if (!type) {
      // only receive number
      val = typeof val === 'string' ? Number(val) : val;
      if (item.value === val) {
        return item.label;
      }
    } else if (type === 'string') {
      // check with String
      if (item.value === val) {
        return item.label;
      }
    }
  }
  return '';
};

/**
 * hump
 * @param {string} text text need to be named by hump
 * @return {string} result
 */
export const toHump = text => {
  text = (text && text.toLowerCase()) || '';
  return text.replace(/\b(\w)|\s(\w)/g, function (m) {
    return m.toUpperCase();
  });
};

/**
 * format value to thounsands
 * @param {string|number} num target
 * @returns 
 */
export const toThousandsFormats = num => {
  // 判断传进来的数字是否为非空数字
  if (!isNaN(parseFloat(num))) {
    let reg = /\./g;
    let newNum = Number(Number(num).toFixed(2)).toLocaleString();

    // 判断转换后的数字是否带有小数
    if (reg.test(newNum)) {
      let numArr = newNum.split(".");
      // 判断小数点后数字长度为1，则自动补0
      numArr[1] = numArr[1].length === 1 ? numArr[1] + "0" : numArr[1];
      return numArr.join(".");
    } else {
      // 整数直接在后面补上0.00
      return newNum + ".00";
    }
  } else {
    return "";
  }
};

/**
 * 格式化form error错误对象
 * @param {Object} _this vue实例对象
 * @param {Object} target error实例对象
 * @param {Object} error 错误
 */
export const formatFormError = (_this, target, error) => {
  // 清空error
  Object.keys(target).forEach(k => { target[k] = ""; });

  // 处理错误
  if (typeof err === "string") {
    // 普通信息
    // this.$Message.error(err);
  } else {
    // 错误对象
    Object.keys(error).forEach(k => {
      if (k in target) {
        target[k] = "";
        _this.$nextTick(() => {
          target[k] = error[k];
        });
      }
    });
  }
};