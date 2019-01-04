/**
 * @param {*} 接口
 */

const ApiRootUrl = 'http://127.0.0.1:3008'

module.exports = {
  IndexUrl: ApiRootUrl + '/home',  // 首页数据接口
  AuthLoginByWeixin: ApiRootUrl + '/users/wxLogin', // 微信登录接口
  CatalogList: ApiRootUrl + '/category/indexAction', // 分类目录全部分类数据接口
  CatalogCurrent: ApiRootUrl + '/category/currentAction', // 分类目录当前分类数据接口
  Catalogory: ApiRootUrl + '/category/categoryNav',
  GoodsCount: ApiRootUrl + '/goods/goodsList', // 统计商品总数
}