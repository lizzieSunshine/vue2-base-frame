/**
 * localStorage
 */
import config from "@/config";
const PREFIX = config["storageKey"] || 'SYS_';

class LocalStorage {
  constructor() {
    this.localStorage = window.localStorage;
    this.prefix = PREFIX;
  }

  set(key, val) {
    if (!key) return;

    let value = '';
    try {
      value = JSON.stringify(val);
    } catch (e) {
      throw new Error('JSON非正常转换');
    }

    this.localStorage.setItem(this.prefix + key, value);
  }

  get(key) {
    if (!key) return '';

    if (typeof key === 'object') {
      throw new Error('key不能是一个对象');
    }

    let val = this.localStorage.getItem(this.prefix + key);
    if (val) {
      try {
        val = JSON.parse(val);
      } catch (e) {
        throw new Error(e);
      }
    }

    return val;
  }

  remove(key) {
    this.localStorage.removeItem(this.prefix + key);
  }

  clear() {
    this.localStorage.clear();
  }
};

export default new LocalStorage();
