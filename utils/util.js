
import { hexMD5 } from './MD5'       // MD5加密 单字节

import { md5 } from './md5-cn.js'    // MD5加密双字节


/**
 * 字典签名排序
 * @param publicSignPro Object
 **/
function publicSigns (publicSignPro) {
  // +"8c7e7e8a6cbe72ad"
  // let publicSignPros = md5(publicSignPro+"8c7e7e8a6cbe72ad")
  // console.log("--------",publicSignPro)
  // console.log("字典签名：", Object.keys(publicSignPro).sort().map(k => `${k}=${publicSignPro[k]}`).join('&')+"8c7e7e8a6cbe72ad")
  // console.log("MD5加密32位长度：", md5(Object.keys(publicSignPro).sort().map(k => `${k}=${publicSignPro[k]}`).join('&')+"8c7e7e8a6cbe72ad").toUpperCase())  
 return md5(Object.keys(publicSignPro).sort().map(k => `${k}=${publicSignPro[k]}`).join('&')+"8c7e7e8a6cbe72ad").toUpperCase();
}

/**
 * 采集、签约小程序跳转封装
 * @param appId string 签约小程序appid
 * @param path  string 小程序路径
 * @param extraData Object 
 * @param extraData.type String 签约跳转 
 * @param extraData.user_name String 刷脸用户（学生）姓名
 * @param extraData.school_name String 学校名称
 * @param extraData.cert_info Object  cert_type:IDCARD（身份证）,EEP_HK_MACAU（港澳通行证）,PASSPORT_NO（护照）；cert_id:证件号;name:姓名 
 * @param extraData.cert_info.cert_type String 证件类型
 * @param extraData.cert_info.cert_id String 证件id号
 * @param extraData.cert_info.name String 证件名称
 * @param extraData.user_type String 职业(STUDENT：学生,STAFF：职员)
 * @param extraData.student_info Object | class_name:班级。student_info和staff_info二选一
 * @param extraData.student_info.class_name String  班级名称
 * @param extraData.staff_info String  occupation:职业 student_info和staff_info二选一
 * @param extraData.occupation String  职业名称
 * @param extraData.school_list Array  学校列表 
 * @param extraData.organization_id String  机构id  fsorgid
 * @param extraData.out_user_id String   学生id 
 * @param extraData.account String  签约手机号
 * @param extraData.token String    用户的token信息
 * @param envVersion String  体验版: trial  开发版：develop  正式版：release 
 * @param success Function 采集签约小程序跳转成功的回调  
 * @param error Function   采集签约小程序跳转失败的回调
 * 参数采用了函数解构赋值
 */
function collectionAndSignUp({
  appId = 'wx5931af4836330935',
  path,
  extraData: {
    type,
    user_name,
    school_list,
    school_name,
    cert_info: {
      cert_type = 'IDCARD',
      cert_id ='123',
      name = '张三'
    },
    user_type = 'STUDENT',
    student_info: {
      class_name
    },
    /*staff_info: { student_info 和 staff_info 二选一
      occupation
    },*/
    school_list: [],
    organization_id,
    out_user_id,
    account,
    token      
  },
  envVersion,  
  success,
  error  
}) {
  wx.navigateToMiniProgram({ 
    appId: appId,                                        
    path: path,                          
    extraData: {
      type: type,                                                    
      user_name: user_name,                                      
      school_name: school_name,                                   
      cert_info: {'cert_type': cert_type,'cert_id': cert_id,'name': name}, 
      user_type: 'STUDENT',                                            
      student_info: {'class_name': class_name},               
      /*staff_info: {'occupation': occupation}, */ // student_info 和 staff_info 二选一
      school_list: school_list,                                
      organization_id: organization_id,                             
      out_user_id: out_user_id,                                  
      account: account,                                    
      token: token                                         
    },
    envVersion: envVersion,         
    success(res) {       
      console.log(success, res)        
    },
    fail(res) {      
      console.log(error, res)
    }
  })
}

module.exports = {  
  publicSigns,
  collectionAndSignUp
}
