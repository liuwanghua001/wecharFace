/*  */
module.exports = {
  valdateLoginStatus(params){    
    const teacherLogin = wx.getStorageSync("teacherUsername")      
    if(!teacherLogin){  
      console.log("家长未登录")   
      wx.showModal({
        title: "请登录",
        content: "请登录后查看信息",
        confirmText:"返回登录",
        confirmColor: "#090",
        showCancel: false,
        function: res => {
          wx.navigateTo({
            url: params.toAddress
          });
        }
      })         
    }    
  }
}
