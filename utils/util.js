function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(date){
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('/')
}


function formatTime2(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}


function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2str(json) {
  var str = '';
  for (var name in json) {
    str += name + '=' + json[name] + '&';
  }
  str = str.substring(0, str.length - 1);
  return str;
}
//将时间戳转换为日期时间字符 yyyy-MM-dd hh:mm
function datetimeFormat(longTypeDate) {
  var datetimeType = "";
  var date = new Date();
  date.setTime(longTypeDate);
  datetimeType += date.getFullYear();  //年 
  datetimeType += "-" + toDou(date.getMonth()+1); //月  
  datetimeType += "-" + toDou(date.getDate());  //日 
  datetimeType += "  " + toDou(date.getHours());  //时 
  datetimeType += ":" + toDou(date.getMinutes());   //分
  return datetimeType;
} 

//时间转化为日期
function getLocalTime(nS) {
  return new nS.toLocaleString().replace(/:\d{1,2}$/, ' ');
}

function toDou(n){
  return n < 10 ? '0' + n:n+'';
}



function backPageBase(page, refFlg) {
  var pages = getCurrentPages();
  if (pages.length > page) {
    //上一个页面实例对象
    var prePage = pages[pages.length - (page + 1)];
    //是否刷新
    if(refFlg)     prePage.onLoad();
  }
  wx.navigateBack({
    delta: page
  })
}
function backPage(page) {
  backPageBase(page, true);
}
function backPageNoRef(page) {
  backPageBase(page, false);
}

function accDiv(arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2;
  try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
  try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
  r1 = Number(arg1.toString().replace(".", ""))
  r2 = Number(arg2.toString().replace(".", ""))
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
//给Number类型增加一个div方法，调用起来更加方便。 
Number.prototype.div = function (arg) {
  return accDiv(this, arg);
}

//乘法函数，用来得到精确的乘法结果 
//说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。 
//调用：accMul(arg1,arg2) 
//返回值：arg1乘以arg2的精确结果 
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
//给Number类型增加一个mul方法，调用起来更加方便。 
Number.prototype.mul = function (arg) {
  return accMul(arg, this);
}

//加法函数，用来得到精确的加法结果 
//说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。 
//调用：accAdd(arg1,arg2) 
//返回值：arg1加上arg2的精确结果 
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}
//给Number类型增加一个add方法，调用起来更加方便。 
Number.prototype.add = function (arg) {
  return accAdd(arg, this);
}

//减法函数，用来得到精确的减法结果 
//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。 
//调用：accSubtr(arg1,arg2) 
//返回值：arg1减去arg2的精确结果 
function accSubtr(arg1, arg2) {
  var r1, r2, m, n;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//给Number类型增加一个subtr 方法，调用起来更加方便。 
Number.prototype.subtr = function (arg) {
  return accSubtr(arg, this);
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  formatTime2: formatTime2,
  json2str: json2str,
  datetimeFormat: datetimeFormat,
  backPage: backPage,
  backPageNoRef:backPageNoRef,
  getLocalTime: getLocalTime
}
