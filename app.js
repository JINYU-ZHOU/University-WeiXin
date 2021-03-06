//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: req => {
        // 获取用户信息
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  wx.setStorageSync('username', res.userInfo.nickName)
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: 'https://spergol.com/login',

                    data: {
                      code: req.code,
                      appid: 'wxa1b202ae01b354d3',
                      secret: 'c018bc3857e272854e69796662a92d4d',
                      username: wx.getStorageSync('username')
                    },
                    header:{
                      'content-Type': 'application/x-www-form-urlencoded',
                    },
                    method: 'POST',
                    success: (res) => {
                      console.log(res.data)
                      if(res && res.header && res.header['Set-Cookie']){
                        wx.setStorageSync('cookieKey', res.header['Set-Cookie']);//保存Cookie到Storage
                      }
                      console.log("cookie:"+wx.getStorageSync('cookieKey'))

                    }
                  })
                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          }
        })

      }
    })
    //修改用户信息
    wx.request({
      url: 'https://spergol.com/change',
      header:{
        'content-Type': 'application/x-www-form-urlencoded',
        'Cookie':wx.getStorageSync('cookieKey')
      },
      method: 'POST',
      data:{
        money:'501'
      }
    })
  },
  globalData: {
    userInfo: null
  }
})