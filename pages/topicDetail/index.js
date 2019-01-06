// topicDetail.wxml
const app = getApp();
const WxParse = require('../../lib/wxParse/wxParse.js');
const util = require('../../utils/util.js');
const api = require('../../config/api.js');

Page({
  data:{
    id: 0,
    topic: {},
    topicList: [],
    commentCount: 0,
    commentList: [],
  },
  
  postComment () {
    wx.navigateTo({
      url: '/pages/commentPost/commentPost?valueId=' + this.data.id + '&typeId=1',
    })
  },

  /*----------------生命周期函数--------------- */
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    const that = this;
    that.setData({
      id: parseInt(options.id),
    });

    util.request(api.TopicDetail, { id: that.data.id }).then(function (res) {
      console.log(res, '专题详情');
      // const data = res.results;
      if (res.statusCode === 1) {
        that.setData({
          topic: res.results.data.rows,
          topicList: res.results.recommendList.rows,
        });
        const contentList = res.results.data.rows;
        const obj = {};
        contentList.forEach((item, index) => {
          obj[index] = item
        })
        console.log(obj[0].content, '这能转换成数组吗？');
        WxParse.wxParse('topicDetail', 'html', obj[0].content, that);
      }
    });
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