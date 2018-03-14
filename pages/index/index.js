//index.js
// 18600975962
//获取应用实例
var app = getApp();
Page({
  data: {
    currentActiveIdx: 0,//当前选中的选项卡
    tabLinkArr: [   
      { idx: 0, name: '最新温度', img: '图片地址' },
      { idx: 1, name: '节点信息', img: '图片地址' }
    ],
    dataT: [
      { "nodeNum": "01", "cattleNo": "150201", "temperature": 32.8, "dateTime": "14:00" },
      { "nodeNum": "02", "cattleNo": "150202", "temperature": 36.8, "dateTime": "16:00" },
      { "nodeNum": "03", "cattleNo": "150203", "temperature": 37.8, "dateTime": "15:00" },
      { "nodeNum": "04", "cattleNo": "150204", "temperature": 36.8, "dateTime": "04:00" },
      { "nodeNum": "05", "cattleNo": "150205", "temperature": 33.8, "dateTime": "22:00" },
      { "nodeNum": "06", "cattleNo": "150206", "temperature": 35.8, "dateTime": "09:00" },
      { "nodeNum": "07", "cattleNo": "150207", "temperature": 37.8, "dateTime": "07:00" },
      { "nodeNum": "08", "cattleNo": "150208", "temperature": 39.8, "dateTime": "17:00" },
      { "nodeNum": "03", "cattleNo": "150203", "temperature": 37.8, "dateTime": "15:00" },
      { "nodeNum": "04", "cattleNo": "150204", "temperature": 36.8, "dateTime": "04:00" },
      { "nodeNum": "05", "cattleNo": "150205", "temperature": 33.8, "dateTime": "22:00" },
      { "nodeNum": "06", "cattleNo": "150206", "temperature": 35.8, "dateTime": "09:00" },
      { "nodeNum": "07", "cattleNo": "150207", "temperature": 37.8, "dateTime": "07:00" },
      { "nodeNum": "08", "cattleNo": "150208", "temperature": 39.8, "dateTime": "17:00" },
      { "nodeNum": "09", "cattleNo": "150209", "temperature": 31.8, "dateTime": "14:00" }
    ],
    dataN: [
      { "nodeNum": "01", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "02", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "03", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "04", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "05", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "06", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "07", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "08", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "09", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "04", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "05", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "06", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "07", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "08", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "09", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "04", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "05", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "06", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "07", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "08", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "09", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" },
      { "nodeNum": "10", "cattleNo": "150201", "bindTime": "2018/01/31 13:15", "dateTime": "98%" }
    ]
  },
  menuTab: function (ev) {
    var tab = ev.currentTarget.dataset.tab;
    var root = ev.currentTarget.dataset.root;
    wx.navigateTo({
      url: '../' + root + '/' + tab + '/' + tab
    });
  },
  scroll:function(){},
  onLoad: function () {
    
    var that = this;

    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  // 选项卡切换
  tabChange: function (event) {
    var idx = event.currentTarget.dataset.idx;
    this.setData({ currentActiveIdx: idx });
    // 页面切换只刷新当前选中的类型数据不全部刷新
    this.refreshData()
  },
  refreshData:function(){

    function createData(num){
      var data = [];
      var count = parseInt(Math.random() * 10) + 10;
      for (var i = 0; i < count; i++) {
        if (num===0){
          data.push({ 
            "nodeNum": "01", 
            "cattleNo": 
            "150201", 
            "temperature": parseInt(Math.random()*2+36), 
            "dateTime": "11:11" });
        }else{
          data.push({ 
            "nodeNum": "01", 
            "cattleNo": "150201",
            "bindTime": "2018/01/31 13:15", 
            "dateTime": parseInt(Math.random() * 2 + 36)+"%" 
            });
        }
      }
      return data;
    }
    
   if(this.data.currentActiveIdx===0){
     this.setData({
       dataT: createData(0)
     })
   }else{
     this.setData({
       dataN: createData(1)
     })
   }
   
    var that = this;
    console.log(that)
    return ;
    wx.request({
      method: 'post',
      url: that.globalData.url + '/common/token',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log(res)
      }
    })
  },
  goLineChar:function(ev){
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../temperatureChart/temperatureChart?id=' + id
    })
  },
  goNodeDetails: function(ev){
    var id = ev.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../nodeDetails/nodeDetails?id=' + id
    })
  }
})
