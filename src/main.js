import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/element-variable.scss';
import '@/libs/request';
import CAS from '@/libs/CASProcess/';
import Header from '@/components/Header/Header.vue';
import Footer from '@/components/Footer/';

Vue.config.productionTip = false;
Vue.prototype.$cas = CAS;

Vue.use(elementUI);
Vue.component('lea-header', Header);
Vue.component('lea-footer', Footer);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
