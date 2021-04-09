
import { http } from 'http.js'                                     // 首先引入封装http.js文件，调用抛出的http

let url = {                                                         // 接口路径

  // 刷脸 老师端

  teacherLogin: '/FaceAppletsApi/FaceTeacherLogin',                 // 老师账号登陆接口
  teacherPasswordModife:'/enforce/saveEnforceLawMessage',           // 老师账号修改密码
  findStudentList: "/FaceAppletsApi/StudentList",                   // 查询学生列表
  findUserToken: "/FaceAppletsApi/GetUserToken",                    // 获取跳转采集小程序token  
  updateStutStudInfo: "/FaceAppletsApi/EditStudentInfo",            // 修改学生信息

  // 刷脸 家长端
  
  parentsLogin: '/FaceAppletsApi/FaceParentLogin',                  // 家长账号登陆接口  
  parentsPasswordModife: "/FaceAppletsApi/FaceParentResetPassword", // 家长账号修改密码
  parentsGetTokens: "/FaceAppletsApi/PreContractToken",             // 家长绑定帐户,预授权拉取token
  getOrderList: "/FaceAppletsApi/OrderList",                        // 家长端订单列表
  getFaceStatus: "/FaceAppletsApi/EditStudentStatus",               // 查询人脸采集状态
  getStudentInfomation: "/FaceAppletsApi/QueryStudentInfo",         // 查询学生信息 如采集、签约状态等
  parentsQuota:"/FaceAppletsApi/StudentLimitRule",                  //家长给学生加限制购买
  parentsUnbundling:"/FaceAppletsApi/UserUnBundling",               //解绑
  


  // 吸粉小程序(支付前跳转小程序)

  getUnionIDAPI: "/PayAdvertWxAppletsApi/jscode2session",           // 获取唯一标识UnionID
  getOrderData: "/PayAdvertWxAppletsApi/CreateOrder"                // 订单信息
} 





module.exports = {                    // 抛出数据


                                      // 刷脸 老师端


  teacherLogin(params){               // 老师账号登陆
    return http({
      url: url.teacherLogin,
      data: params,
    })
  },
  
  getStudentList(params){             // 查询学生列表
    return http({
      url: url.findStudentList,      
      data: params,
    })
  },
  
  toCollectionInfo(params){           // 去采集用户的token
    return http({
      url: url.findUserToken,      
      data: params,
    })
  },
 
  GetFaceUserInfo(params){            // 调用刷脸小程序
    return http({
      url: url.findUserToken,      
      data: params,
    })
  },

  updateStutStudInfo(params){            // 编辑页修改学生信息
    return http({
      url: url.updateStutStudInfo,      
      data: params,
    })
  },


                                      // 刷脸 家长端  


  parentsLogin(params){               // 家长登录
    return http({
      url: url.parentsLogin,      
      data: params,
    })
  },

  getFaceStatus(params){               // 查询采集人脸状态
    return http({
      url: url.getFaceStatus,      
      data: params,
    })
  },
  
  parentsFristLogin(params){          // 家长首次登录默认密码修改  
    return http({
      url: url.parentsPasswordModife,      
      data: params,
    })
  },
  
  findOrderList(params){              // 家长小孩消息的订单列表
    return http({
      url: url.getOrderList,      
      data: params,
    })
  },

  parenetsBindAccount(params){        // 获取签约免密token
    return http({
      url: url.parentsGetTokens,      
      data: params,
    })
  },

  getStudentInfomation(params){        // 查询学生信息 如采集、签约状态等
    return http({
      url: url.getStudentInfomation,      
      data: params,
    })
  },
  parentsQuota(params){                 //家长限制学生的额度
    return http({
      url:url.parentsQuota,
      data:params,
    })
  },
  parentsUnbundling(params){
    return http({
      url:url.parentsUnbundling,
      data:params,
    })
  },




                                      // 吸粉小程序(支付前跳转小程序)

  
  getUnionID(params){                 // 唯一标识UnionID
    return http({
      url: url.getUnionIDAPI,      
      data: params,
    })
  },
  
  getOrderData(params){              // 订单信息
    return http({
      url: url.getOrderData,      
      data: params,
    })
  },
  
}
