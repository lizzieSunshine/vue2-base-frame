import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const originalPush = Router.prototype.push
const originalReplace = Router.prototype.replace

// push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// replace
Router.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

const router = new Router({
  base: process.env.BASE_URL,
  routes
});

export default router;