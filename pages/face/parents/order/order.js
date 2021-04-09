

import { findOrderList } from '../../../../request/api'

Page({

  /**
   * 页面的初始数据
  */
  data: {
    byTime: [                           // 按时间段
      { text: '全部', value: 0 },
      { text: '当天', value: 1 },
      { text: '近一周', value: 7 },
      { text: '近一月', value: 30 }
    ],
    byStatus: [                         // 订单状态 
      { text: '全部', value: -1 },
      { text: '已出货', value: 1 },
      { text: '已退款', value: 2 },
    ],
    defaultTime: "",                    // 时间段默认值  全部
    defaultStatu: "",                   // 订单状态默认值 全部
    orderListData: [
      {
        PwoPrName:"花生",PwoAddtime:"2020-12-12",PwoTradeNO:"OWE1566465465465464654654131561",PwoState:"1",PwoPrImgUrl:"../../source/images/myself-head.png",PwoTotalfee:"3"
      },
      {
        PwoPrName:"原味瓜子",PwoAddtime:"2021-01-12",PwoTradeNO:"OWE1566465465465464654654155869",PwoState:"4",PwoPrImgUrl:"../../source/images/myself-head.png",PwoTotalfee:"4"
      },
      {
        PwoPrName:"红牛",PwoAddtime:"2020-12-12",PwoTradeNO:"OWE1566465465465464654654198741",PwoState:"7",PwoPrImgUrl:"../../source/images/myself-head.png",PwoTotalfee:"4"
      },
      {
        PwoPrName:"花生",PwoAddtime:"2020-11-11",PwoTradeNO:"OWE1566465465465464654654156223",PwoState:"1",PwoPrImgUrl:"../../source/images/myself-head.png",PwoTotalfee:"4"
      }
    ],
    noData: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    // this.initOrder()
  },
  // 初始化订单信息
  // initOrder() {
  //   const parentsInfo = wx.getStorageSync("cookieUser")    
  //   console.log("out_user_id: ",parentsInfo.FSTUID)
  //   let params = {
  //     FSTUID: parentsInfo.FSTUID,     
  //     Day: 0,
  //     State: -1,
  //     Page: 1,
  //     PageSize: 9,
  //   }
  //   console.log("订单传参：",params)
  //   wx.showLoading({
  //     title: '正在加载中...',
  //   })
  //   findOrderList(params).then(res => {
  //     if(res.Code == 200) {
  //       wx.hideLoading()
  //       this.setData({
  //         orderListData: res.Orders
  //       })
  //     }            
  //     // if(res.Code == 100 || res.Orders.length == 1) {
  //     //   this.data.noData = true        
  //     // }            
  //   }).catch(error => {
  //     console.log("请求失败：", error)
  //   })
  //   wx.hideLoading()
  //   console.log("查看data中存的订单：", this.data.orderListData)
  // },
  // 订单状态刷选
  changeDefaultStatu(res) {
    console.log("选中的状态：", res)
    const parentsInfo = wx.getStorageSync("cookieUser") 
    let orderStatus = res.detail
    let params = {
      FSTUID: parentsInfo.FSTUID,  
      State: parseInt(orderStatus),     // 状态 -1=全部 1=已出货 2=已退款
      Day: 0,                           // 天数 0=全部 1=当天 7=近7天 30=近30天
      Page: 1,
      PageSize: 9,
    }
    console.log("订单状态传参：",params)
    wx.showLoading({
      title: '正在加载中...',
    })
    findOrderList(params).then(res => {
      console.log("当前查到的状态数据：", res)
      if(res.Code == 200) {
        wx.hideLoading()
        this.setData({
          orderListData: res.Orders
        })
      }            
      if(res.Orders.length == 1) {
        this.setData({
          noData: true
        })             
      }            
    }).catch(error => {
      console.log("请求失败：", error)
    })
  },
  
  changeDefaultTime(res) {             // 按时间段筛选
    console.log("按时间筛选：", res)
    const parentsInfo = wx.getStorageSync("cookieUser") 
    let orderTime = res.detail
    let params = {
      FSTUID: parentsInfo.FSTUID,  
      State: -1,                       // 状态 -1=全部 1=已出货 2=已退款
      Day: parseInt(orderTime),        // 天数 0=全部 1=当天 7=近7天 30=近30天
      Page: 1,
      PageSize: 9,
    }
    console.log("订单传参：",params)
    wx.showLoading({
      title: '正在加载中...',
    })
    findOrderList(params).then(res => {
      console.log("当前按时间段查询到的数据：", res)
      if(res.Code == 200) {
        wx.hideLoading()
        this.setData({
          orderListData: res.Orders
        })
      }            
      if(res.Orders.length == 1) {
        this.setData({
          noData: true
        })
        // this.data.noData = true        
      }            
    }).catch(error => {
      console.log("请求失败：", error)
    })
    wx.hideLoading()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {    
    wx.showLoading({
      title: '正在加载中...'      
    })
    setTimeout(res => {
      wx.hideLoading()
      // this.initOrder()
    },2000)    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})