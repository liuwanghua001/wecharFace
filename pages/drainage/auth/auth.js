import { getUnionID } from '../../../request/api'
// 获取应用实例
const app = getApp()

Page({
  data: {    
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    // canIUseGetUserProfile: false, // 点击  获取头像妮称
    // canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 登录授权
  handleGetUserInfo(e) {
      console.log(e)
      wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          // userInfo: res.userInfo,
          // hasUserInfo: true
        })
      }
    })
  },
  onLoad() {
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    // }
    // console.log(this.data.userInfo)
    // console.log(this.data.canIUseOpenData = false)
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        const { encryptedData, rawData, iv, signature } = res
        wx.login({
          success: res => {
            const { code } = res
            console.log("login:", code)
            let params = {
              auth_code: code
            }
            getUnionID(params).then(res => {
              if(res.Code == 100) {
                console.log("获取失败100",res)
              }
              if(res.Code == 200) {
                console.log("获取成功200",res)
              }
            }).catch(error => {
              console.log(error)
            })
          }
        })
        // this.setData({
        //   userInfo: res.userInfo,
        //   hasUserInfo: true
        // })
      }
    })
  },

  // getUserInfo(e) {
  //   // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
  //   console.log(e)
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
  // }
})
