// pages/modifyBindings/modifyBindings.js
var util = require('/../../utils/util.js');

Page({

  data: {
    cattleNo:'',
    date:'',
    time:''
  },

  onLoad: function (options) {

    var date = util.formatDate(new Date());//日期

    var time = util.formatTime2(new Date());//时间
    this.setData({
      date: date,
      time: time,
      cattleNo: options.getBindingCattleNo
    })
  
  },
  //日期
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  //时间
  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },
  //输入框牛号值
  bindCattleNo: function (e){
    this.setData({
      cattleNo: e.detail.value
    })
  },
  //删除图标清空牛号
  deleteText: function (e){
    this.setData({
      cattleNo:''
    })
  },
  okToChange: function (e){
    //绑定牛号
    var getCattleNo=this.data.cattleNo
    //绑定日期
    var getDate=this.data.date
    //绑定时间
    var getTime=this.data.time
    //确定后跳转回详情页面
    if (getCattleNo!=''){
      wx.navigateTo({
        url: '../nodeDetails/nodeDetails?getCattleNo=' + getCattleNo + '&getDate=' + getDate + '&getTime=' + getTime + '&modifyBindings=yes'
      })
    }else{
      wx.showToast({
        image: '/img/alert.png',
        title: "牛号不能为空",
        duration: 1000
      });
      return;
    }
  }

})