
// 首先引入封装http.js文件，调用抛出的http
import { http } from 'http.js'

// 接口路径

let url = { 

  // 老师端
  teacherLogin: '/FaceAppletsApi/FaceTeacherLogin',        // 老师账号登陆接口
  teacherPasswordModife:'/enforce/saveEnforceLawMessage',  // 老师账号修改密码
  findStudentList: "/FaceAppletsApi/StudentList",          // 查询学生列表
  findUserToken: "/FaceAppletsApi/GetUserToken",           // 获取跳转采集小程序token
  // findUserFaceInfo: "/FaceAppletsApi/GetFaceUserInfo",     // 查询刷脸用户信息
  // updateStudentInfo: "/FaceAppletsApi/EditStudentStatus",  // 更新学生状态

  // 家长端
  parentsLogin: '/FaceAppletsApi/FaceParentLogin',                  // 家长账号登陆接口  
  parentsPasswordModife: "/FaceAppletsApi/FaceParentResetPassword", // 家长账号修改密码
  parentsGetTokens: "/FaceAppletsApi/PreContractToken",             // 家长绑定帐户,预授权拉取token
  getOrderList: "/FaceAppletsApi/OrderList"                         // 家长端订单列表
} 



//抛出数据
module.exports = {

  // -----------------  老师端  -----------------

  // 老师账号登陆
  teacherLogin(params){
    return http({
      url: url.teacherLogin,
      method: "POST",
      data: params,
    })
  },

  // 查询学生列表
  getStudentList(params){
    return http({
      url: url.findStudentList,
      method: "POST",
      data: params,
    })
  },

  // 去采集用户的token
  toCollectionInfo(params){
    return http({
      url: url.findUserToken,
      method: "POST",
      data: params,
    })
  },

  // 调用刷脸小程序
  GetFaceUserInfo(params){
    return http({
      url: url.findUserToken,
      method: "POST",
      data: params,
    })
  },

  // 更新学生状态
  // updateStudentStuds(params){
  //   return http({
  //     url: url.updateStudentInfo,
  //     method: "POST",
  //     data: params,
  //   })
  // },

  // 查询用户刷脸信息是否签约刷脸成功，方可绑定预签约
  // getUserFaceInfo(params){
  //   return http({
  //     url: url.findUserFaceInfo,
  //     method: "POST",
  //     data: params,
  //   })
  // },  

  // -----------------  家长端  -----------------

  // 家长登录
  parentsLogin(params){
    return http({
      url: url.parentsLogin,
      method: "POST",
      data: params,
    })
  },

  // 家长首次登录默认密码修改  
  parentsFristLogin(params){
    return http({
      url: url.parentsPasswordModife,
      method: "POST",
      data: params,
    })
  },

  // 家长绑定帐户 预授权拉取token
  findOrderList(params){
    return http({
      url: url.getOrderList,
      method: "POST",
      data: params,
    })
  },
  
}
