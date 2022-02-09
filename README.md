# vue2-base-frame
基于vue的基础框架



## 框架配置

- vue2
- element-ui
- scss
- vuex
- prettier
- CAS



## 目录结构

### public



### src

```shell
├─apis # 接口配置
│  └─test
├─assets # 静态资源
│  ├─img
│  │  ├─banners
│  │  └─icons
│  └─scss
├─components # 公用组件
│  ├─Footer
│  └─Header
├─config # 基础配置
├─layout # 结构视图
├─libs # 工具
│  ├─CASProcess
│  ├─localStorage
│  ├─request
│  ├─request copy
│  ├─sessionStorage
│  ├─tools
│  ├─utils
│  └─validator
├─mixins # mixins
├─router # 路由
│  └─routes
├─store # vuex
│  └─modules
└─views # 视图
    └─home
```



#### apis

配置接口，可提前将需要调用的接口配置在apis内，则需要封装axios或其他插件，引入apis/index.js自行完成业务逻辑。基础框架中有一个对api授权的可选操作。一个文件是包含了一个业务下的接口。



**api授权**

对于一些页面的接口，是需要用户登录且登录状态有效才能操作的，如获取用户信息。对于这类接口的页面，我们如果想要在**调用前预验证登录状态有效性**，而非通过接口调用后返回用户失效这种非良好的体验，可以提前在接口里配置`auth`这个参数，代表改接口需要验证状态，如果不配置，默认为false。（`auth`参数是该系统默认的，为了配合后续使用，开发者可自定义扩充）。

该系统默认使用了`formatApiAuth`方法对接口批量授权，批量权限<接口独立设置权限



```js
/**
 * test.js
 */ 

// api授权
import { formatApiAuth } from '@/libs/tools';


const apis = {
  apiName1: {
    name: 'apiName1',
    url: '/api/test/search1',
    method: 'get'
  },
  apiName2: {
    name: 'apiName2',
    url: '/api/test/search2',
    method: 'post',
    auth: true
  }
};

export default formatApiAuth(apis, false);
```



#### assets

- img：图片资源
  - banners：banner图
  - icons：图标
- scss
  - `element-variable.scss`：修改element-ui默认配置
  - `common.scss`：公用，可定义一些全局可使用的变量、class
  - `adaptation.scss`：设备适配
  - `layout.scss`：布局样式表，与layout搭配使用
  - `pages/`：页面具体的样式表



#### config

不对外暴露的配置文件



#### layout

视图layout，使用嵌套路由实现。

- `layout.header.vue`：带header的layout
- `layout.full.vue`：全屏的layout



#### libs

- localstorage
- sessionStorage
- tools：业务相关的工具类
- utils：业务无关的工具类
- validator：常见表单验证
- request：请求对象封装
- CAS：关于CAS的前端逻辑封装



## 关于请求的配置与使用

- 接口配置在`@/apis/`下进行配置

```js
// apis/index.js
import test from './test';

export default {
  test // 模块名
};
```



```js
// apis/test/index.js
api1: {
  name: 'api1', // 别名
  url: '/api/test/search1',
  method: 'get'
  // auth: true
}
```



- 接口调用

```js
this.$request.模块名_接口别名(参数, 自定义参数<可选>).then().catch();
```



- 默认采用的是CAS的前端验证



## 运行及打包

### Project setup

```
npm install
```



### Compiles and hot-reloads for development

```
npm run serve
```



### Compiles and minifies for production

```
npm run build
```



### Run your tests

```
npm run test
```



### Lints and fixes files

```
npm run lint
```



### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
