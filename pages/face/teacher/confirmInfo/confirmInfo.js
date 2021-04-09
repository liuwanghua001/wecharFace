import { getUserFaceInfo, updateStutStudInfo, getStudentInfomation  } from '../../../../request/api'
// 获取应用实例
import { collectionAndSignUp, publicSigns } from '../../../../utils/util' 
const app = getApp()

Page({
  data: {        
    enterStudentInfo: {
      tokens:"",     // token信息
      className:"",  // 班级名称
      lv:"",         // 年级名称
      name:"",      // 学生姓名
      parphone:"",  // 家长手机号
      school:"",    // 学校名称
      fsorgid:"",   // 机构id
      fstuid:""     // 学生id
    },
    modeName: "",   // 修改学生名称
    modePhone: ""   // 修改手机号
  },
  onLoad(options) {        
    this.setData({
      enterStudentInfo:{
        tokens: options.tokens,
        className: options.className, // 班级名称
        lv: options.lv,               // 年级名称
        name: options.name,
        parphone: options.parphone,
        school: options.school,
        fsorgid: options.fsorgid,
        fstuid: options.fstuid,
        studentName:"",
      }
    })
    // console.log("onLoad data：",options)
    // console.log("本页面加载一次",options)
  },
  
  onShow(){        

    console.log("confirminfo.js确认信息页onShow加载一次",)
    // let faceInfoData = wx.getStorageSync("faceInfoData")
    console.log("老师确认页目前学生ID:", this.data.enterStudentInfo.fstuid)
    let StudentParamsSign = {
      FSTUID: this.data.enterStudentInfo.fstuid
    }    
    let StudentParams = {
      FSTUID: this.data.enterStudentInfo.fstuid,
      Sign: publicSigns(StudentParamsSign)
    }
    getStudentInfomation(StudentParams).then(res => {
      if(res.Code == 200) {        
        if(res.FSTStatus == 1) {
          wx.showToast({
            title: "采集成功",
            success: res => {
              wx.redirectTo({
                url: "/pages/face/teacher/studentInfo/studentInfo"
              })
            }
          })
        }        
        console.log("确认页当前学生的id为：",res.FSTUID + "确认页当前学生的签约状态为：",res.FSTStatus)
      }      
      if(res.Code == 100) {
        console.log("确认页-请求失败：", res)
      }       
    })

     // 查看刷脸用户信息，确认学生信息签约时否成功，跳回商户小程序     
    // let params = [
    //   {"FSTUID": this.data.enterStudentInfo.fstuid,"FSOrgId": this.data.enterStudentInfo.fsorgid}
    // ]              
    // // console.log(":---", params)
    // getUserFaceInfo(params).then(res => {
    //   console.log("查看刷脸用户信息：", res)
    // }).catch(err => {
    //   console.log("查看刷脸用户信息失败：", err)
    // })
  },

  // 重新修改学生名称
  onChangeName(evt){     
    this.data.modeName = evt.detail      
    console.log("修改学生姓名", this.data.modeName)
  },

  // 重新修改手机号码
  onChangePhone(evt){    
    this.data.modePhone = evt.detail   
    console.log("修改手机号：", this.data.modePhone)
  },

  // 封装刷脸小程序接口
  packWxFance({user_name, account}) {
    collectionAndSignUp({            
      path:'/pages/face_take_photos/take_photos?is_first=1', 
      extraData: {
        type: 'take_photo',                                                    // 签约跳转
        user_name: user_name,                                                  // 刷脸用户（学生）姓名
        school_name: this.data.enterStudentInfo.school,                        // 学校
        cert_info: {},                                                         // cert_type:IDCARD（身份证）,EEP_HK_MACAU（港澳通行证）,PASSPORT_NO（护照）；cert_id:证件号;name:姓名
        user_type: 'STUDENT',                                                  // 职业(STUDENT：学生
        student_info: {'class_name': this.data.enterStudentInfo.className},    // class_name:班级。
        school_list: [this.data.enterStudentInfo.school],                      // 学校列表
        organization_id: this.data.enterStudentInfo.fsorgid,                   // organazition_id 机构id  fsorgid
        out_user_id: this.data.enterStudentInfo.fstuid,                        // out_user_id  小孩的id
        account: account,                                                      // 签约手机号
        token: this.data.enterStudentInfo.tokens                               // 用户的token信息              
      },            
      envVersion: 'release',            
      success: "老师采集跳转小程序成功",
      error: "老师采集跳转小程序失败"
    })

    // console.log("封装刷脸小程序接口",user_name+"--手机号：",account)
    // wx.navigateToMiniProgram({
    //   appId:'wx5931af4836330935',                            //采集小程序appid
    //   path:'/pages/face_take_photos/take_photos?is_first=1', //小程序路径
    //   extraData: {
    //     type:'take_photo',                                                   // 采集跳转
    //     user_name: user_name,                                                 // 刷脸用户姓名
    //     school_name: this.data.enterStudentInfo.school,                      // 学校
    //     cert_info:{'cert_type':'IDCARD','cert_id':'123','name':'张三'},      // cert_type:IDCARD（身份证）,EEP_HK_MACAU（港澳通行证）,PASSPORT_NO（护照）；cert_id:证件号;name:姓名
    //     user_type:'STUDENT',                                                // 职业(STUDENT：学生,STAFF：职员)
    //     student_info:{'class_name': this.data.enterStudentInfo.className},  // class_name:班级。student_info和staff_info二选一
    //     // staff_info:{'occupation':'教师'},                                // occupation:职业 student_info和staff_info二选一
    //     school_list:[this.data.enterStudentInfo.school],                   // 学校列表
    //     organization_id: this.data.enterStudentInfo.fsorgid,               // organazition_id 机构id  fsorgid
    //     out_user_id: this.data.enterStudentInfo.fstuid,                    // out_user_id
    //     account: account,                                                   // 签约手机号
    //     token: this.data.enterStudentInfo.tokens                           // 用户的token信息
    //   },
    //   // envVersion: 'trial',    // 体验版
    //   // envVersion: 'develop',  // 开发版
    //   // envVersion: 'release',  // 正式版      
    //   success(res) {         
    //     console.log("跳转小程序成功", res)   // 成功跳转到签约小程序      
    //   },
    //   fail(res) {       
    //     console.log("小程序签约失败", res)   // 未成功跳转到签约小程序 
    //   }
    // })
  },
  // K12小程序确认学生信息开始刷脸
  enterStudentInfomation() {           
    let cookieUser = wx.getStorageSync("cookieUser")
    let originalName = this.data.enterStudentInfo.name
    let modeName = this.data.modeName
    let originalPhone = this.data.enterStudentInfo.parphone
    let modePhone = this.data.modePhone
    let isModeName = modeName?modeName:originalName
    let isModePhone = modePhone?modePhone:originalPhone      
    let nameOk = !(/^[\u4e00-\u9fa5]{2,4}$/.test(isModeName))
    let phoneOk = !(/^1[3|5|8][0-9]\d{8}$/.test(isModePhone))
    console.log("姓名reg：",nameOk + "--手机号reg：",phoneOk)   
    // 姓名只能为中文  
    if(nameOk){
      wx.showToast({
        title: '姓名不合法',
        icon: "none"
      })
      return false
    }
    // 手机号规则
    if(phoneOk){
      wx.showToast({
        title: '手机不合法',
        icon: "none"
      })
      return false
    }
    console.log("合法姓名：",isModeName + "--合法手机号：",isModePhone) 
    console.log("确认页token信息：", this.data.enterStudentInfo.tokens)
    // 修改学生姓名和手机
    if(nameOk != true && phoneOk != true) {   
      console.log("手机和姓名都合法")      
      wx.showModal({
        title:"确认学生信息",
        content:"请确认好姓名和手机号",              
        confirmText:"确认",
        confirmColor:"#090",
        success: res => {
          if(res.confirm) {
            let statusProSign = {
              FSTUID: this.data.enterStudentInfo.fstuid,
              FSTName: isModeName,
              FSTPhone: isModePhone
            }
            let statusPro = {
              FSTUID: this.data.enterStudentInfo.fstuid,
              FSTName: isModeName,
              FSTPhone: isModePhone,
              Sign: publicSigns(statusProSign)
            }  
            console.log("老师确认页签名修改签名：", publicSigns(statusProSign))
            updateStutStudInfo(statusPro).then(res => {
              if(res.Code == 200) {
                wx.showToast({
                  title:"提交成功",                  
                  success: res => {                    
                    this.packWxFance({
                      user_name: isModeName, 
                      account: isModePhone
                    })
                  }
                })
              }            
            })
          } else if (res.cancel) {
            wx.showToast({
              title:"已取消修改",
              icon:"none"
            })
          }                                
        }
      })      
        
        
    }

    
    // let statusPro = {
    //   FSTUID: cookieUser.FSTUID,
    //   FSTName: this.data.enterStudentInfo.name,
    //   FSTPhone: this.data.enterStudentInfo.parphone,
    // }
    // console.log("修改学生信息参数：", statusPro)
    // updateStudentStuds(statusPro).then(res => {
    //   console.log("成功修改学生信息", res)
    // })
    // 更改学生信息
                  
  }
})
