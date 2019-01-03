const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();
// 获取应用实例
Page({
  data:{
    banner: [],
    channel: [],
    brands: [],
    newGoods: [],
    hotGoods: [],
    topics: [],
    floorGoods: [],
  },
  
  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      console.log('home', res);
      if (res.statusCode === 1) {
        const data = res.results;
        that.setData({
          banner: data.banner.rows,
          channel: data.channel.rows,
          brands: data.brandList.rows,
          newGoods: data.newGoods.rows,
          hotGoods: data.hotGoods.rows,
          topics: data.topicList.rows,
          floorGoods: data.newCategoryList.rows,
        })
      }
    })
  },

  /** ------生命周期函数------- */

  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getIndexData();
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'Demo', // 分享标题
      desc: '学习小程序', // 分享描述
      path: '/pages/index/index' // 分享路径
    }
  }
})