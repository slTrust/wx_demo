//app.js
App({

  onLaunch:function(){
    
  },

  onShow: function () {
    var that = this;
    //调用登录接口   获取token 并且存入缓存
    wx.login({
      success: function (loginRes) {
        var code = loginRes.code;
        console.log(loginRes);
        if (code) {
          console.log('获取用户登录凭证：' + code);
          wx.request({
            url: that.globalData.url + '/common/token',
            data: {
              code: code
            },
            success: function (res) {
              console.log('获取session：' + res.data.token);
              wx.setStorage({
                key: "token",
                data: res.data.token
              });
            
              that.globalData.token = res.data.token;


            }
          })
          

        } else {
          console.log('获取用户登录态失败：' + loginRes.errMsg);
        }
      }
    })
  },
  
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    //全局url
    url: "http://192.168.2.108:8081/api",
  token: '',
  img_url: "http://192.168.2.108:8081/"
    
  }
})