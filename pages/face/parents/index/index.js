// echarts核心文件
// import * as echarts from '../../ec-canvas/echarts';
import * as echarts from '../../../../components/parents/ecCanvas/echarts'

function initChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // new
  });
  canvas.setChart(chart);

  var option;
  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }]
  };

  chart.setOption(option);
  return chart;
}

// 自己的接口
import { parentsFristLogin, parenetsBindAccount, getFaceStatus, getStudentInfomation } from '../../../../request/api'

  
import { publicSigns, collectionAndSignUp } from '../../../../utils/util'

Page({ 
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    showbindAccount: true,     // 修改默认密码框  
    showParentGuidePage: false, // 家长引导页
    confirmNewPassword:"",      //
    confirmPassword:"",
    IsLogin: "",                // 是否首次登录
    password: "",               // 密码
    username:"",                // 用户名/手机号
    child: "",                  // 小孩名称
    FSOrgId: "",                // 机构id
    FSTUID: "",                 // 学生/用户id
    school: "",                 // 学校名称
    className: "",              // 班级名称    
    token: "",                  // 签名
    FSTStatus: "",              // 会员状态,
    ec: {
      onInit: initChart
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {  
          
    console.log("家长首页onLoad加载一次") 
    // console.log("指定的key",  wx.getStorageSync('faceToken'))
    console.log("家长首页跳转传参",options)
    this.setData({
      IsLogin: options.IsLoin,
      password: options.Password,
      username: options.Account,
      child: options.Name,
      FSOrgId: options.FSOrgId,
      FSTUID: options.FSTUID,      
      school: options.SchoolName,      
      className: options.ClassName,
      FSTStatus: options.FSTStatus
    })     
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    // 更新采休状态改变
    let faceInfoData = wx.getStorageSync("faceInfoData")    
    let StudentParamsSign = {
      FSTUID: faceInfoData.FSTUID || this.data.FSTUID // 优先用缓存的，没有就用传过来的
    }
    let StudentParams = {
      FSTUID: faceInfoData.FSTUID || this.data.FSTUID,
      Sign: publicSigns(StudentParamsSign)
    }
    getStudentInfomation(StudentParams).then(res => {
      if(res.Code == 200) {        
        this.setData({
          FSTStatus: res.FSTStatus
        })
        console.log("当前学生的id为：",res.FSTUID + "当前学生的签约状态为：",res.FSTStatus)
      }      
      if(res.Code == 100) {
        console.log("家长首页-请求失败：", res)
      }       
    })
          
    if(!faceInfoData) {    
      wx.setStorage({
        key: "faceInfoData",
        data: {
          username: this.data.username,                // 用户名/手机号
          child: this.data.child,                      // 小孩名称
          FSOrgId: this.data.FSOrgId,                  // 机构id
          FSTUID: this.data.FSTUID,                    // 学生/用户id
          school: this.data.school,                    // 学校名称
          className: this.data.className,              // 班级名称              
          FSTStatus: this.data.FSTStatus               // 会员状态          
        }
      })
    }

    // 判断用户首次登录
    if(this.data.IsLogin == 0){      
      this.setData({
        showbindAccount: true,
      })
    }    
              
  },
  

  // 家长去绑定付款帐号 / 获取预签约token
  bindAccount(){        
    wx.getStorage({
      key: "faceInfoData",
      success: (data) => {
        console.log("获取刷脸的信息：", data)
        console.log("获取刷脸的信息：", data.data)
        let paramsSign = {  
          business_name: "K12",
          FSTUID: data.data.FSTUID,
          FSOrgId: data.data.FSOrgId          
        }  
        let params = {  
          business_name: "K12",
          FSTUID: data.data.FSTUID,
          FSOrgId: data.data.FSOrgId,
          Sign: publicSigns(paramsSign)          
        }  
        parenetsBindAccount(params).then(res => {                 
          collectionAndSignUp({            
            path:'/pages/face_index/index?is_first=1', 
            extraData: {
              type: 'siqn',                                                    // 签约跳转
              user_name: data.data.child,                                      // 刷脸用户（学生）姓名
              school_name: data.data.school,                                   // 学校
              cert_info: {},                                                   // cert_type:IDCARD（身份证）,EEP_HK_MACAU（港澳通行证）,PASSPORT_NO（护照）；cert_id:证件号;name:姓名
              user_type: 'STUDENT',                                            // 职业(STUDENT：学生
              student_info: {'class_name': data.data.className},               // class_name:班级。
              school_list: [data.data.school],                                 // 学校列表
              organization_id: data.data.FSOrgId,                              // organazition_id 机构id  fsorgid
              out_user_id: data.data.FSTUID,                                   // out_user_id  小孩的id
              account: data.data.username,                                     // 签约手机号
              token: res.presign_token                                         // 用户的token信息              
            },            
            envVersion: 'release',            
            success: "家长跳转签约小程序成功",
            error: "家长跳转签约小程序失败"
          })
          /*wx.navigateToMiniProgram({ 
            appId:'wx5931af4836330935',                                        // 签约小程序appid
            path:'/pages/face_index/index?is_first=1',                         // 小程序路径
            extraData: {
              type: 'siqn',                                                    // 签约跳转
              user_name: data.data.child,                                      // 刷脸用户（学生）姓名
              school_name: data.data.school,                                   // 学校
              cert_info: {'cert_type':'IDCARD','cert_id':'123','name':'张三'}, // cert_type:IDCARD（身份证）,EEP_HK_MACAU（港澳通行证）,PASSPORT_NO（护照）；cert_id:证件号;name:姓名
              user_type: 'STUDENT',                                            // 职业(STUDENT：学生,STAFF：职员)
              student_info: {'class_name': data.data.className},               // class_name:班级。student_info和staff_info二选一
              // staff_info: {'occupation':'教师'},                            // occupation:职业 student_info和staff_info二选一
              school_list: [data.data.school],                                // 学校列表
              organization_id: data.data.FSOrgId,                             // organazition_id 机构id  fsorgid
              out_user_id: data.data.FSTUID,                                  // out_user_id  小孩的id
              account: data.data.username,                                    // 签约手机号
              token: res.presign_token                                         // 用户的token信息
            },
            // envVersion: 'trial',    // 体验版
            // envVersion: 'develop',  // 开发版
            // envVersion: 'release',  // 正式版            
            success(res) {
              // 成功跳转到签约小程序 
              console.log("跳转小程序成功", res)        
            },
            fail(res) {
              // 未成功跳转到签约小程序 
              console.log("小程序签约失败", res)
            }
          }) */           
        })        
      }
    })
    
  },

  // 关闭父级引导页
  onCloseshowParentGuidePage(){
    this.setData({
      showParentGuidePage: false
    })
  },

  // 关闭弹框
  clonseBox(){
    this.setData({ showbindAccount: false });
  },

  // 家长首次确认修改密码
  confirmModPwd(){
    let confirmNewPassword = this.data.confirmNewPassword
    let confirmPassword = this.data.confirmPassword
    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/ig
    console.log(reg.test(confirmNewPassword))    
    if(!reg.test(confirmNewPassword) && !reg.test(confirmPassword)){
      wx.showToast({
        title: '密码必须是8-16位的数字组合',
        icon:"none" 
      })
      return false
    }
    
    if(confirmNewPassword.length <= 0 && confirmPassword.length <= 0){
      wx.showToast({
        title: '密码不能为空',
        icon:"none"
      })
      return false
    }
    if(confirmNewPassword != confirmPassword){
      wx.showToast({
        title: '密码不一致',
        icon:"none"
      })
      return false
    }    
    console.log("新密码：",this.data.confirmNewPassword + "确认密码：",this.data.confirmPassword)    
    let paramsChangSign = {       
      Account: this.data.username, 
      Password: this.data.password, 
      Name: this.data.child, 
      NewPassword: this.data.confirmNewPassword
    }      
    let params = {       
      Account: this.data.username, 
      Password: this.data.password, 
      Name: this.data.child, 
      NewPassword: this.data.confirmNewPassword,
      Sign: publicSigns(paramsChangSign) 
    }
    console.log("修改参数：", params)    
    // 如果密码修改完了就不在修改
    parentsFristLogin(params).then(res => { 
      if(res.Code == 200){
        wx.showToast({
          title: '修改密码成功',
        })
        this.setData({
          showbindAccount: false
        })
        this.setData({
          showParentGuidePage: true
        })        
      }
      console.log("修改默认密码成功：", res)
    }).catch(res => {
      console.log("修改默认密码失败")
    })
  },

  // 点击透明层
  bindAccountOpacity(){
    this.setData({
      showbindAccount: false,
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