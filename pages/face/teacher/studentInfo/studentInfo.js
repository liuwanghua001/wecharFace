
import { getStudentList, toCollectionInfo } from '../../../../request/api'
import { valdateLoginStatus } from '../../../../request/global'
import { publicSigns } from '../../../../utils/util' 

Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultShow: false,
    parentsFirstLogin: false, // 老师查看家长首次默认密码弹窗
    closeSaveCanvase: false,  // 老师端公告信息弹窗
    studentListInfo:[
      {FSTName:"文真",FSTPhone: "13077884455","FSTStatus":"1"},
      {FSTName:"文真",FSTPhone: "13077884455","FSTStatus":"2"},
      {FSTName:"文真",FSTPhone: "13077884455","FSTStatus":"0"},
      {FSTName:"文真",FSTPhone: "13077884455","FSTStatus":"0"},
      {FSTName:"文真",FSTPhone: "13077884455","FSTStatus":"0"},
      {FSTName:"文真",FSTPhone: "13077884455","FSTStatus":"0"},
    ],       // 学生列表信息
    isHiddenPwd: true,
    parentsChangePwd:"",      // 获取老师自己的登录密码
    schoolInfo:{
      ClassName: "",
      DefaultPassword: "",
      FCID: "",
      GradeName: "",
      SchoolName: "",      
      teacherPwd: ""
    },
    tokenInfo: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    console.log("options数据：", options)
    // 初始化顶部学校信息
    this.setData({
      schoolInfo:{
        ClassName: decodeURIComponent(options.ClassName),
        DefaultPassword: options.DefaultPassword,
        FCID: options.FCID,
        GradeName: decodeURIComponent(options.GradeName),
        SchoolName: decodeURIComponent(options.SchoolName),
        teacherPwd: options.teacherPwd
      }
    })
    this.schoolCookieInfo(options)    
    // 获取当前设备屏幕宽高
    wx.getSystemInfo({
      success: res=> {
        console.log(res);
        console.log(res.windowWidth);
        console.log(res.windowHeight);
        this.setData({
          deviceWidth: res.windowWidth,
          deviceHeight: res.windowHeight
        })
      }
    })      
    // 保存图片到相册
    this.saveImgtoPhone()
  },

  // 点击透明层取消弹窗
  closeSaveCanvase() {
    this.setData({
      closeSaveCanvase: false
    })    
  },

  // 公告信息窗显示
  announcementInfo() {
    this.setData({
      closeSaveCanvase: true
    })  
  },

  // 保存图片到相册
  saveImgtoPhone() {   
    const ctx = wx.createCanvasContext('myCanvas');
    var imgPath = '../../source/images/gh_6a45f1123c22_258.jpg';
    var imgUserPath = '../../source/images/gh_6a45f1123c22_258.jpg';    
    var code = '../../source/images/gh_6a45f1123c22_258.jpg';
    //绘制图像到画布 x y width height
    ctx.drawImage(imgPath, 0, 0, 
      (this.data.deviceWidth / 750) * 600, 
      (this.data.deviceHeight / 1334) * 500);
    ctx.setFillStyle('#090')
    // 创建一个矩形
    ctx.fillRect(0, 
      (this.data.deviceHeight / 1334) * 500,
      (this.data.deviceWidth / 750) * 600, 
      (this.data.deviceHeight / 1334) * 350);
    // 绘制图像到画布
    ctx.drawImage(imgUserPath,
       (this.data.deviceWidth / 750) * 30,
       (this.data.deviceHeight / 1334) * 530,
       (this.data.deviceWidth / 750) * 120,
       (this.data.deviceWidth / 750) * 120)
    //创建文字
    ctx.setFontSize((this.data.deviceWidth / 750) * 30)
    ctx.setFillStyle('#FFF')
    //文案 x y
    ctx.fillText('转发到群聊',
    (this.data.deviceWidth / 750) * 170, 
    (this.data.deviceHeight / 1334) * 590)
    ctx.setFontSize((this.data.deviceWidth / 750) * 25)
    ctx.setFillStyle('#FFF')
    ctx.fillText('中谷四楼云数科技', 
    (this.data.deviceWidth / 750) * 170, 
    (this.data.deviceHeight / 1334) * 630)
    ctx.setFontSize((this.data.deviceWidth / 750) * 22)
    ctx.setFillStyle('#FFF')
    ctx.fillText('退出小程序，选择群聊，点击选择相册', 
    (this.data.deviceWidth / 750) * 30, 
    (this.data.deviceHeight / 1334) * 710)

    ctx.fillText('保存到本地',
    (this.data.deviceWidth / 750) * 230, 
    (this.data.deviceHeight / 1334) * 800)
    ctx.setFillStyle('#FFF')
    ctx.setFontSize((this.data.deviceWidth / 750) * 40)
    ctx.fillRect(0, 
      (this.data.deviceHeight / 1334) * 50, 
      (this.data.deviceWidth / 750) * 100, 
      (this.data.deviceHeight / 1334) * 50);

    // 绘制图像到画布
    ctx.drawImage(
      code, 
      (this.data.deviceWidth / 750) * 470, 
      (this.data.deviceHeight / 1334) * 540,
      (this.data.deviceWidth / 750) * 100,
      (this.data.deviceWidth / 750) * 100)
    // 渲染
    ctx.draw()
    // 把当前画布指定区域的内容导出生成指定大小的图片
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 600,
      height: 750,
      destWidth: 1200,  //2倍关系
      destHeight: 1500, //2倍关系
      canvasId: 'myCanvas',
      success: res => {          
          console.log("生成图片成功：",res,"---图片地址：",res.tempFilePath);
          this.setData({            
            shareImgSrc: res.tempFilePath
          })
          // 保存到相册
          wx.saveImageToPhotosAlbum({
            //shareImgSrc为canvas赋值的图片路径
            filePath: this.data.shareImgSrc,
            success: res => {
              wx.showToast({
                title: '保存图片成功'
              })
            }
        })          
      }      
    })        
  }, 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {    
    // const schoolCookie = wx.getStorageSync("schoolInfo")
    // this.setData({
    //   schoolInfo:{
    //     ClassName: decodeURIComponent(schoolCookie.ClassName),
    //     DefaultPassword: schoolCookie.DefaultPassword,
    //     FCID: data.data.FCID,
    //     GradeName: decodeURIComponent(schoolCookie.GradeName),
    //     SchoolName: decodeURIComponent(schoolCookie.SchoolName),
    //     teacherPwd: data.data.teacherPwd
    //   }
    // })  
    this.loadStudentList()          
  },

  // 缓存顶部的学校名称、班级名称、年级名称
  schoolCookieInfo(options) {    
    const schoolCookie = wx.getStorageSync("schoolInfo")
    console.log("缓存教师顶部信息", schoolCookie)
    if(!schoolCookie){ 
      wx.setStorage({
        key: "schoolInfo",
        data: options
      })              
    }    
    wx.getStorage({
      key: "schoolInfo", 
      success: (data) => {
        console.log("onload获取缓存数校信息：", data.data.ClassName)
        this.setData({
          schoolInfo:{
            ClassName: decodeURIComponent(data.data.ClassName),
            DefaultPassword: data.data.DefaultPassword,
            FCID: data.data.FCID,
            GradeName: decodeURIComponent(data.data.GradeName),
            SchoolName: decodeURIComponent(data.data.SchoolName),
            teacherPwd: data.data.teacherPwd
          }
        })             
      }
    })
  },

  // 查看默认密码弹框
  getParentsDfaultPwd(){    
    this.setData({
      parentsFirstLogin: true
    })
  },

  // 查看家长默认密码
  teacherGetparentPwd(){    
    let teacherLoginPwd = this.data.schoolInfo.teacherPwd
    let teacherInputPwd = this.data.parentsChangePwd
    if(teacherInputPwd.length === 0 && teacherInputPwd === ""){
      wx.showToast({
        title: '密码不能为空',
        icon:"none"
      })
      return false
    }
    if(teacherLoginPwd.length === teacherInputPwd.length && teacherLoginPwd === teacherInputPwd) {
      console.log("密码正确显示成功：")
      this.setData({
        isHiddenPwd: false
      })
    }else{
      wx.showToast({
        title: '密码不正确',
        icon:"none"
      })
      return false
    }    
  },

  // 复制密码
  copyPwd(e){
    if(this.data.isHiddenPwd == false){
      // console.log("已查看")      
      wx.setClipboardData({
        data: e.target.dataset.parentsefault,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '复制成功'
              })
            }
          })
        }
      })
    }
    if(this.data.isHiddenPwd == true){
      // console.log("未查看")
      wx.showToast({
        title: '请查看密码',
        icon: "none"
      })
    }   
  },

  // 关闭查看密码弹窗
  parentsFirstLoginBox(){
    console.log("关闭弹窗")
    this.setData({
      parentsFirstLogin: false
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  
  // 获取缓存教师顶部信息 获取学生列表信息
  loadStudentList() {    
    const schoolInfo = wx.getStorageSync("schoolInfo")     
    let classId = schoolInfo.FCID
    let studentInfoSign = {FCID: classId}
        let params = {                       
          FCID: classId,
          Sign: publicSigns(studentInfoSign)          
        }        
        console.log("获取学生列表传参：", params)
        wx.showLoading({
          title: '正在加载中...',
        }) 
        getStudentList(params).then(res => {
          wx.hideLoading()  
          console.log("学生列表：", res)          
          // console.log("学生列表：", res.student_List)   
          if(res.Code == 200) {            
            wx.hideLoading()            
            this.setData({
              studentListInfo: res.student_List
            })    
          }             
          // if(res.length < 1) {
          //   this.data.defaultShow = true
          // }
        }).catch(err => {
          console.log("获取学生例表失败")
        }) 
    // wx.getStorage({
    //   key: "schoolInfo", 
    //   success: (data) => {                                  
                        
    //   }
    // }) 
  },

  // 跳转到确认信息
  toCollection(event){    
    var ev = event.target.dataset;
    console.log(event)
    // console.log("学生ID：",ev.fsorgid + "机构Id:", ev.fstuid)
    // 获取跳转采集小程序token

    let fstuid = ev.fstuid   // 学生ID
    let className = ev.class
    let lv = ev.lv
    let name = ev.name
    let parphone = ev.parphone
    let school = ev.school 
    let requestMiniProInfo = `?&className=${className}&lv=${lv}&name=${name}&parphone=${parphone}&school=${school}&fstuid=${fstuid}`
    wx.navigateTo({
      url: '/pages/face/teacher/confirmInfo/confirmInfo' + requestMiniProInfo
    }) 

    let paramsSign = {      
      FSTUID: ev.fstuid,
      FSOrgId: ev.fsorgid,      
    }
    let params = {      
      FSTUID: ev.fstuid,
      FSOrgId: ev.fsorgid,
      Sign: publicSigns(paramsSign)
    }
    
    // toCollectionInfo(params).then(res => {                    
    //   // 获取token            
    //   console.log("获取token:", )
    //   let tokens = res.token
    //   let fsorgid = ev.fsorgid // 机构Id
    //   let fstuid = ev.fstuid   // 学生ID
    //   let className = ev.class
    //   let lv = ev.lv
    //   let name = ev.name
    //   let parphone = ev.parphone
    //   let school = ev.school 
    //   // let token = this.data.schoolInfo.tokenInfo
    //   console.log("学生id:", fstuid)
    //   console.log("机构id:", fsorgid)
    //   let requestMiniProInfo = `?tokens=${tokens}&className=${className}&lv=${lv}&name=${name}&parphone=${parphone}&school=${school}&fsorgid=${fsorgid}&fstuid=${fstuid}`
    //   if(res.Code == 200) {
    //     wx.navigateTo({
    //       url: '/pages/face/teacher/confirmInfo/confirmInfo' + requestMiniProInfo
    //     }) 
    //   } else {
    //     wx.showToast({
    //       title:"跳转失败",
    //       icon:"none"
    //     })
    //   }                
    // })        
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log("生命周期函数--监听页面隐藏")
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
    console.log("页面已上拉-可以开始加载")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 下拉刷新
  onPullDownRefresh () {
    wx.showLoading({
      title: '正在加载中...'      
    })
    setTimeout(res => {
      wx.hideLoading()
      this.loadStudentList()
    },2000)    
  }
})