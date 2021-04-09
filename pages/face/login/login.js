
import { teacherLogin, parentsLogin } from '../../../request/api' 

import { publicSigns } from '../../../utils/util' // 签名封装

// import pingzi from 'js-md5'
// console.log("md555:" , pingzi)
 
// var result = querystring.stringify({Password:'ys',Account:"234"});

// const sortKeys = Object.keys({Password:'ys',Account:"234"}).sort((a, b) => a > b ? 1 : a === b ? 0 : -1);
// console.log("sortKeys--:", sortKeys)
// let sortKeys = {
//     Password:'ys', // 80
//     Account:"234", // 65
//     t:"2342", // 84
//     computer: "00", // 67
//     Qer: "瓶子", // 81
//     Sign: "123" // 83
//   }

// const sortKey =  Object.keys(sortKeys).sort().map(k => `${k}=${sortKeys[k]}`).join('&');
// console.log("sortKey---", sortKey)

// sortKeys.forEach((item, index) =>{
//   console.log(item)
// })
// console.log("字典排序成功：", sortKeys)

// let sings = `Account=${username}&Password=${password}8c7e7e8a6cbe72ad` 


// console.log(result);
const app = getApp()

Page({
  data: {        
    customStylesInput:"width:100%;border-bottom:1px solid #e5e5e5;padding-left:0;", 
    customStylesLoginBtn:"background:#dbdbdb;color:#5D5D5D;",   
    active: 0,
    isAgreement: false,  // 协议未同意
    flagLogin: true,     // 禁用按钮
    teacherUsername:"",  // 老师用户名
    teacherPassword:"",  // 老师密码, 
    tokens:"",
    parentsLogin:{
      username:"",   // 家长输入的手机号/用户名
      password:"",   // 家长密码
      childName:"",  // 家长小孩（单个）
      FSTName: "",   // 学生姓名
      FSTPhone: "",  // 手机号 
      FSTStatus: "", // 会员状态(0 未采集 1 未绑定付款账号 2 正常 )
      FSTUID: "",    // 学生id
      FSOrgId: "",   // 机构id
    }
  },  
  onLoad() {
    // 回到登录清空签约状态
    // wx.clearStorageSync("FSTStatus")    
    // wx.removeStorageSync("faceInfoData")
    wx.clearStorage()
    // console.log("16进制：", hexMD5w('hex'))
    // console.log("16进制：", (hexMD5('hex')).toUpperCase())
    
    // b8d1b43eae73587ba56baef574709ecb
        
  },
  // 老师登录
  teacherLogin(){    
    console.log("teacher")
    console.log("用户名：",this.data.teacherUsername)
    let username = this.data.teacherUsername
    let password = this.data.teacherPassword      
    let loginSign = {
      Password: password,
      Account: username
    }      
    let params = {      
      Account: username, 
      Password: password,   
      Sign: publicSigns(loginSign)
    } 
    if(username.length === 0 || password.length === 0){
      wx.showToast({
        title: '登录不能为空',
        icon: "none"
      })
      return false
    }        
    
    wx.redirectTo({
      url:"/pages/face/teacher/studentInfo/studentInfo" 
    });
    
    // teacherLogin(params).then(res => {   
    //   wx.showLoading({
    //     title:'正在登录中...'
    //   })   
      
    //   wx.hideLoading();      
    //   console.log(res);              
    //   wx.setStorageSync('teacherUsername', params.Account)                
    //   let schoolInfo = res.teacherInfo
    //   let ClassName = schoolInfo.ClassName
    //   let DefaultPassword = schoolInfo.DefaultPassword
    //   let FCID = schoolInfo.FCID
    //   let GradeName = schoolInfo.GradeName
    //   let SchoolName = schoolInfo.SchoolName
    //   let teacherPwd = this.data.teacherPassword
    //   let paramsAdd = `?teacherPwd=${teacherPwd}&ClassName=${encodeURIComponent(ClassName)}&DefaultPassword=${DefaultPassword}&FCID=${FCID}&GradeName=${encodeURIComponent(GradeName)}&SchoolName=${encodeURIComponent(SchoolName)}`      
    //   if(res.Code == 200) {
    //     wx.showToast({
    //       title: '登录成功'          
    //     })
    //     setTimeout(res => {
    //       wx.redirectTo({
    //         url:"/pages/face/teacher/studentInfo/studentInfo" + `${paramsAdd}`
    //       });
    //     }, 2000)        
    //   }        
    // }).catch(err => {
    //   wx.showToast({
    //     title: '登录信息错误',
    //     icon: "none"
    //   })
    // });
  },
  // 家长密码获取
  parentsLoginPassword(evt){    
    this.data.parentsLogin.password = evt.detail
  },
  // 家长用户名获取
  parentsLoginUsername(evt){    
    this.data.parentsLogin.username = evt.detail
  },
  // 家长小孩获取
  parentsLoginChildName(evt){    
    this.data.parentsLogin.childName = evt.detail
  },
  // 家长登录
  parentsLoginbtn() {         
    console.log("parents") 
    let Account = this.data.parentsLogin.username     // 家长用户名
    let Password = this.data.parentsLogin.password    // 家长密码
    let Name = this.data.parentsLogin.childName       // 家长小孩

    // console.log("中文转成unicode码：", encodeURI(Name))
    let parentsLoginParams = {
      Account: Account, 
      Password: Password, 
      Name: Name      
    }  
    // console.log("家长签名：", publicSigns(parentsLoginParams))
    let params = {             
      Account: Account, 
      Password: Password, 
      Name: Name,
      Sign: publicSigns(parentsLoginParams)
    }   
    // if(Account.length === 0 || Password.length === 0 || Name.length === 0 ){      
    //   wx.showToast({
    //     title:'登录不能为空',
    //     icon:"none"
    //   })
    //   return false
    // }     

    wx.redirectTo({
      url:"/pages/face/parents/index/index"
    });

    // parentsLogin(params).then(res => {  
    //   wx.showLoading({
    //     title:'正在登录中...'
    //   })                
    //   if(res.Code == 100){        
    //     wx.hideLoading();
    //     console.log("家长登录失败：", res)
    //     wx.showToast({
    //       title:"登录信息不正确",
    //       icon: "none"
    //     })
    //     return false
    //   }        
    //   if(res.Code == 200){
    //     wx.hideLoading();
    //     let parentsInputInfo = {
    //       username: this.data.parentsLogin.username,            // 家长输入的手机号/用户名          
    //       childName: this.data.parentsLogin.childName,          // 家长输入的小孩（单个）
    //     }        
    //     let isLogin = res.parent_Student_List.filter((item, index) => {          
    //       return item.FSTName == parentsInputInfo.childName && item.FSTPhone == parentsInputInfo.username
    //     })        
    //     let FSOrgId = isLogin[0].FSOrgId                        // 机构id
    //     let FSTUID = isLogin[0].FSTUID                          // 学生id
    //     let FSTName = isLogin[0].FSTName                        // 小孩名称
    //     let FSTPhone = isLogin[0].FSTPhone                      // 手机号码
    //     let FSTStatus = isLogin[0].FSTStatus                    // 学生状态        
    //     let SchoolName = isLogin[0].SchoolName                  // 学校名称
    //     let ClassName = isLogin[0].ClassName                    // 班级名称
    //     let GradeName = isLogin[0].GradeName                    // 年级名称              
    //     let IsLoin = res.IsLoin                                 // 是否首次登录  
        
    //     let cookieUser = {
    //       shcoolName: SchoolName,
    //       ClassName: ClassName,
    //       GradeName: GradeName,
    //       FSTName: FSTName,
    //       FSTUID: FSTUID
    //     }
    //     // let par = {  
    //     //   business_name: "K12",
    //     //   FSTUID: FSTUID,
    //     //   FSOrgId: FSOrgId          
    //     // }    
    //     // parenetsBindAccount(par).then(res => {      
    //     //   console.log("登录页接口的获取token成功",res) 
    //     //   // this.setData({
    //     //   //   tokens: res.presign_token
    //     //   // })    
    //     //   this.data.tokens = res.presign_token
    //     // })
    //     // let tokens = this.data.tokens;                          // 获取保存的token
    //     // console.log("获取保存的token", tokens)
    //     let setCookieUser = wx.setStorageSync('cookieUser', cookieUser)
    //     // if(!setCookieUser){
          
    //     // }
    //     let parentsLoginPar = `?FSTStatus=${FSTStatus}&IsLoin=${IsLoin}&Account=${Account}&Password=${Password}&Name=${Name}&FSOrgId=${FSOrgId}&FSTUID=${FSTUID}&SchoolName=${SchoolName}&ClassName=${ClassName}&GradeName=${GradeName}`
    //     wx.redirectTo({
    //       url:"/pages/face/parents/index/index" + parentsLoginPar
    //     });
    //   }      
    // }).catch(err => {
    //   console.log("登录失败") 
    // })    
  },
  // 同意授权协议书
  agreement(){    
    console.log(this.isAgreement = !this.isAgreement)    
    if(this.isAgreement){
      this.setData({
        flagLogin: false
      })      
      this.setData({
        customStylesLoginBtn:"background:#04c360;color:#fff;"
      })
    }else{
      this.setData({
        customStylesLoginBtn:"background:#dbdbdb;color:#5f5f5f;",
        flagLogin: true        
      })      
    }
  }
})
