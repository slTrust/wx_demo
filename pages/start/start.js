// pages/client/client.js
var that = null;
var Util = require('../../utils/util.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image:null
  },
  onLoad: function () {
    var that = this;
    var rand1 = 0;
    var useRand = 0;
    var images = new Array;
    images[1] = "../../img/1.jpg";
    images[2] = "../../img/2.jpg";
    images[3] = "../../img/3.jpg";
    
    var imgnum = images.length - 1;;
    do {
      var randnum = Math.random();
      rand1 = Math.round((imgnum - 1) * randnum) + 1;
    } while (rand1 == useRand);
    useRand = rand1;
    that.setData({
      image: images[useRand]
    })

 
    var that = this;
    //调用登录接口   获取sessionKey 并且存入缓存
    wx.login({
      success: function (loginRes) {
     
        var code = loginRes.code;
        console.log(loginRes);
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: app.globalData.url + '/common/token',
            data: {
              code: code
            },

            success: function (res) {
              
              console.log('获取session：' + res.data.token);
              wx.setStorage({
                key: "session_key",
                data: res.data.token
              });
              //将session_key设置到全局里
              app.globalData.session_key = res.data.token;
              //判断是否已绑定用户
              if (res.data.userId) {
                wx.redirectTo({
                  url: '/pages/index/index'
                })
              } else {
                wx.redirectTo({
                  url: '/pages/Login/Login'
                })
              }

            }
          })


        } else {
          console.log('获取用户登录态失败：' + loginRes.errMsg);
        }
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          image: '../../asset/images/alert.png',
          title: res,
          duration: 1000
        });
      }
    })
  }
})