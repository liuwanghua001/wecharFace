// pages/face/update/update.js
import { parentsFristLogin } from '../../../../request/api'
import { publicSigns } from '../../../../utils/util'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword:'',      //旧密码
    confirmNewPassword:'', //新密码
    confirmPassword:'',  //确定新密码
    username:'',         //用户名/手机号
    child:'',            //小孩名称

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let faceInfoData = wx.getStorageSync("faceInfoData")  
    this.setData({
      username:faceInfoData.username,
      child:faceInfoData.child,
    })
  },
  //点击确认修改密码
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
      Password: this.data.oldPassword, 
      Name: this.data.child, 
      NewPassword: this.data.confirmNewPassword
    }      
    console.log(paramsChangSign);
    let params = {       
      Account: this.data.username, 
      Password: this.data.oldPassword, 
      Name: this.data.child, 
      NewPassword: this.data.confirmNewPassword,
      Sign: publicSigns(paramsChangSign) 
    }
    console.log("修改参数：", params);
    //修改密码发送请求
    parentsFristLogin(params).then(res=>{
      if(res.Code==200){
        wx.navigateBack();
        wx.showToast({
          title: '修改密码成功',
        })
      }else{
        wx.showToast({
          title: '修改密码错误',
          icon: "none"
        })
      }
    })
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