const util = require('../../../utils/util.js');
const api = require('../../../config/api.js');
const user = require('../../../services/user.js');
const app = getApp();

Page({
  data: {
    userInfo: {},
    showLoginDialog: false
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {

  },
  onShow: function () {
    this.setData({
      userInfo: app.globalData.userInfo,
    });
  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  onUserInfoClick: function () {
    if (wx.getStorageSync('token')) {

    } else {
      this.showLoginDialog();
    }
  },

  showLoginDialog() {
    this.setData({
      showLoginDialog: true
    })
  },

  onCloseLoginDialog() {
    this.setData({
      showLoginDialog: false
    })
  },

  onDialogBody() {
    // 阻止冒泡
  },

  onWechatLogin(e) {
    console.log(e);
    const { encryptedData, iv} = e.detail;
     wx.login({
       timeout: 3000,
       success: res => {
         const code = res.code;

         wx.request({
           url: `http://127.0.0.1:3008/users/wxLogin`, // 我们的服务端地址
           method: 'POST',
           data: {
             code,
             encryptedData,
             iv,
           },
           success: res => {
             // res.data 为服务端正确登录后签发的 JWT
            //  wx.setStorageSync('token', res.data);

             this.setData({
               userInfo: e.detail.userInfo,
               showLoginDialog: false
             });
             app.globalData.userInfo = e.detail.userInfo;
             app.globalData.token = res.data;
             wx.setStorageSync('userInfo', JSON.stringify(e.detail.userInfo));
             wx.setStorageSync('token', res.data);
           }
         })
         
       }
     })
  },

  onOrderInfoClick: function (event) {
    wx.navigateTo({
      url: '/pages/ucenter/order/order',
    })
  },

  onSectionItemClick: function (event) {

  },

  // TODO 移到个人信息页面
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})