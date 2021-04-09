//1.首先引入封装http.js文件，调用抛出的http
import { outHttp } from 'outHttp.js'

// 小程序跳转第三方签约接口 

let outUrl = {

  // 家长端
    
  parentsBindAccount: "/offlineface/contracts/presign",  // 预签约接口

}

//抛出数据

module.exports = {

  // 家长端 小程序跳转第三方接口签约

  // 预签约接口
  toBindPayAccount(params){
    return outHttp({
      url: outUrl.parentsBindAccount,
      method: "POST",
      data: params,
    })
  },
}