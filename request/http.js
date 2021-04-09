/**
 * 封装自己的http 请求方法
 */ 
// const apiUrl = "https://test.ourvend.com:443"; // 正式服务器
// const apiUrl = "http://172.16.7.244";               // 测试服务器
// const apiUrl = "https://test.ourvend.com:443"     // 开发地址  有签名
const apiUrl = "https://wxd.ourvend.com:443"     // 开发地址

const http = (params) => {    
  return new Promise((resolve, reject) => {   // 返回promise 对象
    wx.request({
      url: apiUrl + params.url,               //服务器url+参数中携带的接口具体地址
      data: params.data,                      //请求参数
      header: params.header || {
        "Content-Type": "application/json",   //设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      },
      method: params.method || 'POST',        //默认为POST,可以不写
      dataType: params.dataType,              //返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType,      //响应的数据类型
      success: res => {        
        resolve(res.data)                     //接口访问正常返回数据        

        if(res.Code != 200){                  // 判断请求失败
          // wx.showToast({
          //   icon:'none',
          //   title: "请求失效"
          // }) 
        } 		
		                                         
        if (res.Msg == "签名有误") {       // 判断签名失效
          wx.showToast({
            title: "非法登录",
            icon:"none",
            success: res => {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            }
          })                 
        }
      },
      fail: function (e) {
        wx.showToast({
          icon:'none',
          title: '请求失败',
        })
        reject(e)
      },
      complete: function(){
        // wx.hideLoading();
      }
    })
  })  
}

//抛出http 方便别的界面调用
module.exports = {
  http: http,  
} 
