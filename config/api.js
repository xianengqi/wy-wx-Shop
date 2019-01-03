/**
 * @param {*} 接口
 */

const ApiRootUrl = 'http://127.0.0.1:3008'

module.exports = {
  IndexUrl: ApiRootUrl + '/home',  // 首页数据接口
  AuthLoginByWeixin: ApiRootUrl + '/users/wxLogin', // 微信登录接口
}