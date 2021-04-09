

// https://blog.csdn.net/hammer1010/article/details/106366150
App({
  onLaunch() {
    // 已登录直接进首页
    // const teacherLogin = wx.getStorageSync("teacherUsername")
    // console.log("老师已登录？：", teacherLogin)    
    // if(teacherLogin){  
    //   wx.navigateTo({
    //     url:"/pages/face/teacher/studentInfo/studentInfo"
    //   });
    // }
    // if(!teacherLogin){ 
    //   console.log("未师未登录")
    // }
    

    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  

  globalData: {
    userInfo: null    
  }
})
