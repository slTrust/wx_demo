// pages/client/client.js
var that = null;
var Util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  },
  formSubmit: function (e) {
    //自己写的跳转
    wx.redirectTo({
      url: '../index/index',
    })
    return ;
    //自己写的跳转

    if (wx.showLoading){
      wx.showLoading({
        title: '正在提交'
      })
    }
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.request({
      method: 'POST',
      url: app.globalData.url + '/common/login',
      data: e.detail.value,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'token': app.globalData.token
      },
      success: function (res) {
        if (wx.hideLoading) {
          wx.hideLoading();
        }
        if (res.data.return_sts == '00') {
          wx.showToast({
            title: '登录成功',
            duration: 1000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index',
            })
          }, 1000);
        } else{
          wx.showToast({
            image: '../asset/images/err.png',
            title: res.data.message,
            duration: 1000
          });
        }
      }
    })

  },

  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})