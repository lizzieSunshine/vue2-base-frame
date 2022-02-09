import Vue from 'vue';
import request from './axios';

Vue.use({
  install(Vue) {
    Vue.prototype['$request'] = request;
  }
});
