// pages/temperatureChart/temperatureChart.js
var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var lineChart = null;
var windowWidth = 320;
Page({
  data: {
    nodeInfo: {
      nodeName: '01',
      cattleNo: '010015'
    },
    tabArr: [
      { idx: 0, name: '4小时内' },
      { idx: 1, name: '12小时内' },
      { idx: 2, name: '24小时内' }
    ],
    currentActiveIdx: 0,//默认选中的时间区间
    baseData: [
      { "x": "11:00", "y": 35, "category": "未设置" },
      { "x": "11:20", "y": 37, "category": "未设置" },
      { "x": "11:40", "y": 36, "category": "未设置" },
      { "x": "12:00", "y": 38, "category": "未设置" },
      { "x": "12:20", "y": 35, "category": "未设置" },
      { "x": "12:40", "y": 36, "category": "未设置" },
      { "x": "13:00", "y": 37, "category": "未设置" },
      { "x": "13:20", "y": 36, "category": "未设置" },
      { "x": "13:40", "y": 35, "category": "未设置" },
      { "x": "14:00", "y": 37, "category": "未设置" },

      { "x": "16:40", "y": 36, "category": "010015" },
      { "x": "17:00", "y": 38, "category": "010015" },
      { "x": "17:20", "y": 35, "category": "010015" },
      { "x": "17:40", "y": 36, "category": "010015" },
      { "x": "18:00", "y": 37, "category": "010015" },
      { "x": "18:20", "y": 36, "category": "010015" },
      { "x": "18:40", "y": 36, "category": "010015" },
      { "x": "19:00", "y": 38, "category": "010015" },
      { "x": "19:20", "y": 35, "category": "010015" },
      { "x": "19:40", "y": 36, "category": "010015" },
      { "x": "20:00", "y": 37, "category": "010015" },
      { "x": "20:20", "y": 36, "category": "010015" },
      
      { "x": "20:40", "y": 36, "category": "010017" },
      { "x": "21:00", "y": 38, "category": "010017" },
      { "x": "21:20", "y": 35, "category": "010017" },
      { "x": "21:40", "y": 36, "category": "010017" },
      { "x": "22:00", "y": 37, "category": "010017" },
      { "x": "22:20", "y": 36, "category": "010017" },
      { "x": "22:40", "y": 36, "category": "010017" },
      { "x": "23:00", "y": 38, "category": "010017" },
      { "x": "23:20", "y": 35, "category": "010017" },
      { "x": "23:40", "y": 36, "category": "010017" },
      { "x": "00:00", "y": 37, "category": "010017" },
      { "x": "00:20", "y": 36, "category": "010017" }
    ]
  },
  //更新数据
  updateData: function (event) {
    var idx = event.currentTarget.dataset.idx;
    this.setData({ currentActiveIdx: idx });
    var obj = this.filterData(this.data.baseData)
    lineChart.updateData({
      categories:obj.xData,
      series: obj.series
    });
  },
  onLoad: function (e) {
    console.log(e)
    var obj = this.filterData(this.data.baseData)
    this.chartInit(obj.xData,obj.series);
    
  },
  filterData: function (data) {
    var data = data;
    var keyArr; //key数组   返回map的每一列
    var xData = [];
    var category = {};
    var series = [];
    if(data&&data.length!==0){
      //获取key数组   第一列为x第二列为y第三列为种类
      keyArr = Object.keys(data[0]);
      var column0 = keyArr[0];
      var column1 = keyArr[1];
      var column2 = keyArr[2];
      
      //筛选出种类  未设置  00001  000002
      for (var i = 0; i < data.length; i++) {
        //初始化时间列
        xData.push(data[i][column0]);
        var categoryCode = data[i][column2];
        category[categoryCode] = '';
      }
      console.log(category)
      
      var categoryArr = Object.keys(category);
      // 根据类别  初始化series
      for(var i=0;i<categoryArr.length;i++){
        series.push(
          {
            name: categoryArr[i],
            data: [],
            format: function (val, name) {
              return val.toFixed(1) + '℃';
            }
          }
        )
      }

      //循环每一条数据  根据类型设置值
      for(var i=0;i<data.length;i++){
        var yData = data[i][column1]; //当前条的温度
        var currentCategory = data[i][column2]; //当前种类
        //循环种类
        for(var j=0;j<series.length;j++){
          if (series[j]['name'] === currentCategory){
            series[j].data.push(yData);
          }else{
            series[j].data.push(null);
          }
         
        }
      }   

    


    }
    console.log(xData)
    console.log(series)   
    return {
      xData: xData,
      series: series
    }
  },
  chartInit: function (xData,series) {
    //获取屏幕宽度
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // var category = ["11:00", "11:20", "11:40", "12:00",
    //   "12:20", "12:40", "13:00", "13:20",
    //   "13:40", "14:00"]
    // var data = [36.8, 37.5, 36.2, 39.0, 35.9, null, null, null, null, null];
    lineChart = new wxCharts({
      canvasId: 'lineCanvas',
      type: 'line',
      categories: xData,
      animation: true,
      // background: '#f5f5f5',
      series: series,
      xAxis: {
        disableGrid: true
      },
      yAxis: {
        title: '',
        format: function (val) {
          return val.toFixed(1);
        },
        min: 34,
        max: 40
      },
      width: windowWidth,
      height: 250,
      dataLabel: false,
      dataPointShape: true,
      extra: {
        lineStyle: 'curve'
      }
    });
  },
  // 图表点击气泡
  touchHandler: function (e) {
    console.log(lineChart.getCurrentDataIndex(e));
    lineChart.showToolTip(e, {
      // background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },

});