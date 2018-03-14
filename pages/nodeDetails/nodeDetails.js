// pages/nodeDetails/nodeDetails.js
var util = require('/../../utils/util.js');
Page({
  data: {
    //绑定过的历史信息
    listData: [],
    //节点编号
    nodeNumber:'',
    //剩余电量
    residualElectricity:'',
    //绑定牛号
    bindingCattleNo:'',
    //绑定时间
    bindingDateTime:'',
    //弹框相关
    hidden: true,
    nocancel: false,
    modalText:'',
    //是否禁用按钮
    disabled:false
  },
  onLoad: function (options) {
    if (options.modifyBindings) {
      //如果是从修改绑定页面返回来的
      var dateTime = options.getDate + ' ' + options.getTime;
      this.setData({
        bindingCattleNo: options.getCattleNo,
        bindingDateTime: dateTime
      })
    }else{
      //直接从列表进入
      this.setData({
        //绑定牛号
        bindingCattleNo: '1502006',
        //绑定时间
        bindingDateTime: '2018/01/31 13:15'

      })
    }
    //不管从哪进入都要修改这个值
    this.setData({
      //绑定过的历史信息
      listData: [
        { "cattleNo": "1512004", "dateRang": "2018/01/31 13:15 ~ 2018/02/23 13:15" },
        { "cattleNo": "1512002", "dateRang": "2018/01/01 10:00 ~ 2018/01/31 13:15" },
        { "cattleNo": "1512001", "dateRang": "2017/12/04 12:30 ~ 2018/01/01 10:00" }
      ],
      //节点编号
      nodeNumber: '01',
      //剩余电量
      residualElectricity: '98%',
    })
    
  },
  //解除绑定
  unbind: function (){
    var cattleNo = this.data.bindingCattleNo;
    this.setData({
      //弹框中内容信息
      modalText: '确定要解除该节点和牛号“'+cattleNo+'”之间的绑定关系?',
      hidden:false
    })
  },
  //解除绑定取消按钮
  cancel: function () {
    this.setData({
      hidden: true
    });
  },
  //解除绑定确定按钮
  confirm: function () {
    var objListDateTime = this.data.bindingDateTime;//获得的绑定时间
    var TodayDateTime = util.formatDate(new Date())+' '+util.formatTime2(new Date());//当前日期
    objListDateTime = objListDateTime + ' ~ ' + TodayDateTime;

    var objListData = { cattleNo: this.data.bindingCattleNo, dateRang: objListDateTime};
    this.data.listData.unshift(objListData)

    //这应该有个请求 请求成功后再进行删值并添加到现在列表中走下面那个setData

    this.setData({
      hidden: true,
      bindingCattleNo: '未设置',
      bindingDateTime: '--',
      listData: this.data.listData,
      disabled:true
    });
  },
  //修改绑定
  modifyBinding: function (e){
    var getBindingCattleNo = this.data.bindingCattleNo;
    if (getBindingCattleNo=='未设置'){
      getBindingCattleNo='';
    }
    wx.navigateTo({
      url: '../modifyBindings/modifyBindings?getBindingCattleNo=' + getBindingCattleNo
    })
  }
})