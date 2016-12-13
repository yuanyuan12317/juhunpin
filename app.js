//app.js
//用于定义整个应用程序的逻辑
//首先App函数是一个全局函数
//app函数的作用就是用来创建一个应用程序实例
//每个应用程序都会有他的生命周期
App({
  //当应用程序启动时执行的事件
  onLaunch: function () {
    //调用API从本地缓存中获取数据,方便调起微信提供的能力，如本地存储，用户信息，支付功能等
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    // console.log("onlaunch")
  },
  //这个方法与当前应用程序无关，可以定义一些公用的方法（用于程序内共享）
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
    
  },
  globalData:{
    userInfo:null
  }
})