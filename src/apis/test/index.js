/**
 * 测试接口配置
 * {
 *   name: 调用接口的别名
 *   url: api
 *   method: get | post | put | delete,
 *   auth<boolean>: 是否验证有效性，不设置改参数默认为false
 * }
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