const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data:{
    navList: [],
    categoryList: [],
    currentCategory: {},
    goodsCount: 0,
    scrollLeft: 0,
    scrollTop: 0,
    scrollHeight: 0,
    count: 227,
    currentOne: []
  },

  getCatalog: function () {
    let that = this;
    wx.showLoading({
      title: '加载中...',
    });
    util.request(api.CatalogList).then(function (res) {
      console.log('分类',res);
      const data = res.results;
      that.setData({
        navList: data.categoryList.rows,
        currentCategory: data.currentCategory.rows,
      });
      wx.hideLoading();
    });
    // util.request(api.GoodsCount).then(function (res) {
    //   console.log('good', res);
    //   const data = res.results;
    //   that.setData({
    //     goodsCount: data.goodsCount.rows
    //   });
    // });
  },

  getCurrentCategory: function (id) {
    let that = this;
    util.request(api.CatalogCurrent, {id: id})
      .then(function (res) {
        console.log('idCurrent', res);
        const data = res.results;
        that.setData({
          currentCategory: data.subList.rows,
          currentOne: data.currentOne.rows,
        })
      })
  },
  switchCate: function (event) {
    console.log(event);
    const that = this;
    const currentTarget = event.currentTarget;

    // if (this.data.currentCategory.id == event.currentCategory.dataset.id) {
    //   return false;
    // }
    this.getCurrentCategory(event.currentTarget.dataset.id);
  },
  /* --------生命周期函数--------- */
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getCatalog();
    // this.getCurrentCategory();
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
      // title: 'title', // 分享标题
      // desc: 'desc', // 分享描述
      // path: 'path' // 分享路径
    }
  }
})