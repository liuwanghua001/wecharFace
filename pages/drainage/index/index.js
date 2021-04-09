
import { getUnionID, getOrderData } from '../../../request/api'
// import querystring from 'querystring'

Page({

  /**
   * 页面的初始数据
  */
  data: {    
    code: "",            // code码
    orderInfo: {         // 订单信息
      mid:"",            // 机器号
      pid:"",            // 商品ID
      sid:"",            // 货道号
      payoid: "",        // 用户openid 登陆获取
      discode:"",        // 优化码
    }
  },
   /**
   * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {    
    let urlParms = decodeURIComponent(options.q)   
    console.log("线上H5跳转线上小程序地址动态传参：", urlParms)
        
    // console.log("线上地址动态传参：", decodeURIComponent(urls))

    // console.log("接收到的传参数：", options)
    // let urlParms = 'http://test.ourvend.com/appletsjump/index.html?mid=123321&sid=333'
    
    let urls = decodeURIComponent("http%3A%2F%2Ftest.ourvend.com%2Fappletsjump%2Findex.html%3Fmid%3D1706200093%26sid%3D1")
    console.log("机器id",urls.split('?')[1].split("&")[0].split("=")[1])
    console.log("货道id", urls.split('?')[1].split("&")[1].split("=")[1])
    console.log("16:03:16.23")
    
    // console.log("接收跳转到小程序的参数1：", options)
    // console.log("接收跳转到小程序的参数2：", decodeURIComponent(options))
    // console.log("接收跳转到小程序的参数3：", decodeURIComponent(options.q))
    // 支付前跳转小程序页面： pages/drainage/index/index

    // 获取登录code
    wx.login({              
      success: res => {        
        this.data.code = res.code
        this.getOpenId()
      }
    })

    // 接收商口信息传参   扫码跳转： pages/drainage/index/index    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    
  },

  // 获取oppenId
  getOpenId() {
    let params = {
      auth_code: this.data.code
    }
    getUnionID(params).then(res => {
      if(res.Code == 100) {
        console.log("获取失败100",res)
      }
      if(res.Code == 200) {
        // console.log("请求成功UnionID", JSON.stringify(res) + "----获取openid:", res.UserInfo.openid)
        console.log("----获取openid:", res.UserInfo.openid)
        // this.data.payoid = res.UserInfo.openid
        this.setData({
          orderInfo: {
            payoid: res.UserInfo.openid
          }              
        })
      }
    }).catch(error => {
      console.log(error)
    })
  },

  // 立即支付
  couponPayment() {    
    // 判断缓存中有无token 没有跳到授权页面，获取登录成功后的token API

    // 开始下单
    let params = {
      mid:"1706200093", // 机器id 
      pid:"",
      sid:"1",          // 货道id
      payoid: this.data.orderInfo.payoid,
      discode:"",
    }
    console.log("所有参数：", params)
    getOrderData(params).then(res => {
      if(res.Code == 100) {
        console.log("开始支付-请求失败",res)
      }      
      if(res.Code == 200) {
        console.log("开始支付-请求成功",res)
        // 添加JSAPI参数
        wx.requestPayment({      
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success (res) { 
            console.log("支付成功：", res)
          },
          fail (res) { 
            console.log("支付失败：", res)
          }
        })
      }      
    })
    
    // 创建订单，获取订单编号 API

    // 准备预支付 {object object} pay API

    // 查询后台订单状态  待支付->成功  API

    // 发起微信请求，跳转支付成功页面。


  },

  // 立即支付领券减0.2-0.5元
  payImmediately() {
    // 开始下单
    let params = {
      mid:"1706200093", // 机器id 
      pid:"",
      sid:"3",          // 货道id
      payoid: this.data.orderInfo.payoid,
      discode:"",
    }
    console.log("所有参数：", params)
    getOrderData(params).then(res => {
      if(res.Code == 100) {
        console.log("开始支付-请求失败",res)
      }      
      if(res.Code == 200) {
        console.log("开始支付-请求成功",res)
        // 添加JSAPI参数
        wx.requestPayment({      
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.package,
          signType: res.signType,
          paySign: res.paySign,
          success (res) { 
            console.log("支付成功：", res)
          },
          fail (res) { 
            console.log("支付失败：", res)
          }
        })
      }      
    })    
  },

  // 跳转H5链接广告商页面
  toH5link(){
    wx.navigateTo({
      url: '/pages/h5CommercialAdver/h5CommercialAdver',
    })
  },   

  // 不出货文字描述页面
  payRequest() {
    wx.navigateTo({
      url: '/pages/drainage/shippingProblem/shippingProblem',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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