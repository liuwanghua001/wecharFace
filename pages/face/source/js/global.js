
module.exports = {
  // 跳转首页 底部导航
  toIndex(){
    console.log("跳转首页")
    wx.redirectTo({
      url: '/pages/parents/index/index',
    })
  },

  // 跳转订单页 底部导航
  toOrder: function(){
    wx.redirectTo({
      url: '/pages/parents/order/order',
    })
  },

  // 跳转我的 底部导航
  toMySelf(){
    wx.redirectTo({
      url: '/pages/parents/myself/myself',
    })
  },
} 