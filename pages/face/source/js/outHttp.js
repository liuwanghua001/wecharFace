/**
 * 封装第三方的http 请求方法
 */ 
const apiOutUrl = "https://api.mch.weixin.qq.com/v3"

// 第三方接口封装
const outHttp = (params) => {  
  //返回promise 对象
  return new Promise((resolve, reject) => {
    wx.request({
      url: apiOutUrl + params.url,    //服务器url+参数中携带的接口具体地址
      data: params.data,   //请求参数
      header: params.header || {
        "Content-Type": "application/json",   //设置后端需要的常用的格式就好，特殊情况调用的时候单独设置
      },
      method: params.method || 'POST',   //默认为POST,可以不写
      dataType: params.dataType,         //返回的数据格式,默认为JSON，特殊格式可以在调用的时候传入参数
      responseType: params.responseType, //响应的数据类型
      success: function (res) {
        //接口访问正常返回数据
        resolve(res.data)
        // console.log(res)
        if(res.code != 200){
          // wx.showToast({
          //   icon:'none',
          //   title: "请求失败"
          // }) 
        } 		
		    //这一步 根据后端  来协定
        if (res.data.message == '令牌失效，请重新登录！') {         
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
      },
      fail: function (e) {
        wx.showToast({
          icon:'none',
          title: '第三方接口请求失败',
        })
        reject(e)
      }
    })
  })
}

//抛出http 方便别的界面调用
module.exports = {  
  outHttp: outHttp
} 