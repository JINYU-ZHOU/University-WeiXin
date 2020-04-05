// pages/test/test.js
const chooseLocation = requirePlugin('chooseLocation');//地图信息
const key = 'AHJBZ-NMCYX-UO44G-ZC66D-YMS5V-C7FKB'; //使用在腾讯位置服务申请的key
const referer = '大学生一站式平台'; //调用插件的app的名称
const location = JSON.stringify({
  latitude: 39.89631551,
  longitude: 116.323459711
});
const category = '生活服务,娱乐休闲';

wx.navigateTo({
  url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer + '&location=' + location + '&category=' + category
});
//页面加载的时候提交用户数据，接口已完善
Page({
 onShow: function(){
  const location = JSON.stringify(chooseLocation.getLocation()); 
  console.log(location)
  wx.request({
    url: 'http://localhost:8080/University/main',
    data:{
      username:wx.getStorageSync('username'),
      telephone:'12345678910',
      lftime:'2020-03-15',
      map:location,
      
    },
    method:'POST',
    header:{
      'content-Type': 'application/x-www-form-urlencoded',
      'Cookie':wx.getStorageSync('cookieKey')
    }
 
  })
 }
})