const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const app = getApp();

Page({
  data:{
    topicList: [],
    page: 1,
    size: 10,
    count: 0,
    scrollTop: 0,
    showPage: false,
  },
  // 下一页
  nextPage: function (event) {
    console.log(event, '下一页');
    const that = this;
    if (this.data.page + 1 > that.data.count / that.data.size) {
      return true;
    }

    that.setData({
      "page": parseInt(that.data.page) + 1
    });
    this.getTopic();
  },
  // 上一页
  prevPage: function (event) {
    console.log(event, '上一页');
    if (this.data.page <= 1) {
      return false;
    }

    const that = this;
    that.setData({
      "page": parseInt(that.data.page) - 1
    });
    this.getTopic();
  },
  // 事件处理函数
  getTopic: function () {
    let that = this;
    that.setData({
      scrollTop: 0,
      showPage: false,
      topicList: []
    });
    // 页面渲染完成
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 2000,
    });

    util.request(api.TopicList, { page: that.data.page, } ).then(function (res) {
      console.log(res, '分页');
      const data = res.results;
      if (res.statusCode === 1) {
        
        that.setData({
          scrollTop: 0,
          topicList: data.rows,
          showPage: true,
          count: data.count,
        })
      }
      wx.hideToast();
    })
  },

  /*------------------生命周期函数------------------ */
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    this.getTopic();
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
})