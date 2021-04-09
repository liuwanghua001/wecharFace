import { 
  createdCanvasImage,  
  createdCanvasfillRect,
  createdCanvasImagefillText,
  saveKeepLast,
  drawNormalText 
} from '../../../../utils/canvas'

Page({

  /**
   * 页面的初始数据
   */
  data: { 
    alreadyBind: null,
    shareImgSrc: '',
    deviceWidth: '',
    deviceHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  // 保存图片到相册
  saveImgtoPhone() {   
    // const canvasId = 'myCanvas';
    const ctx = wx.createCanvasContext("myCanvas")
    var imgPath = '../../source/images/gh_6a45f1123c22_258.jpg';
    var imgUserPath = '../../source/images/gh_6a45f1123c22_258.jpg';    
    var code = '../../source/images/gh_6a45f1123c22_258.jpg';

    //绘制图像到画布 x y width height
    // ctx.drawImage(imgPath, 0, 0, 
    //   (this.data.deviceWidth / 750) * 600, 
    //   (this.data.deviceHeight / 1334) * 500);
    // ctx.setFillStyle('#090')
    createdCanvasImage({   // 画一个绿色的矩形
      ctx: ctx,   
      imgPath: imgPath,
      moveX: 0,
      moveY: 0,
      deviceWidth: (this.data.deviceWidth / 750) * 600,
      deviceHeight: (this.data.deviceHeight / 1334) * 500,      
      setFillStyle: "#090"
    })
    
    // 创建一个矩形
    // ctx.fillRect(0, 
    //   (this.data.deviceHeight / 1334) * 500,
    //   (this.data.deviceWidth / 750) * 600, 
    //   (this.data.deviceHeight / 1334) * 350);
      createdCanvasfillRect({
        ctx: ctx,
        X: 0, 
        Y: (this.data.deviceHeight / 1334) * 500, 
        deviceWidth: (this.data.deviceWidth / 750) * 600, 
        deviceHeight: (this.data.deviceHeight / 1334) * 350
      })      

    // 绘制图像到画布
    // ctx.drawImage(imgUserPath,
    //    (this.data.deviceWidth / 750) * 30,
    //    (this.data.deviceHeight / 1334) * 530,
    //    (this.data.deviceWidth / 750) * 120,
    //    (this.data.deviceWidth / 750) * 120)
       createdCanvasImage({    // 左侧小二维码
        ctx: ctx,   
        imgPath: code,
        moveX: (this.data.deviceWidth / 750) * 30,
        moveY: (this.data.deviceHeight / 1334) * 530,
        deviceWidth: (this.data.deviceWidth / 750) * 120,
        deviceHeight: (this.data.deviceWidth / 750) * 120,      
        setFillStyle: "#F00"
      })       


    // //创建文字
    // ctx.setFontSize((this.data.deviceWidth / 750) * 30)
    // ctx.setFillStyle('#FFF')

    // //文案 x y
    // ctx.fillText('转发到群聊',
    // (this.data.deviceWidth / 750) * 170, 
    // (this.data.deviceHeight / 1334) * 590)
    // ctx.setFontSize((this.data.deviceWidth / 750) * 25)
    // ctx.setFillStyle('#FFF')
    // createdCanvasImagefillText({
    //   canvasId: canvasId,
    //   text: "转发到群聊",
    //   X: (this.data.deviceWidth / 750) * 170,
    //   Y: (this.data.deviceHeight / 1334) * 590,
    //   FontSize: (this.data.deviceWidth / 750) * 250,
    //   setFillStyle: '#FFF'
    // })
    drawNormalText(
      ctx, 
      "转发到群聊", 
      (this.data.deviceWidth / 750) * 170,
      (this.data.deviceHeight / 1334) * 550,
      (this.data.deviceWidth / 750) * 30,
      'white',
      'left',
      'top'
    )
    drawNormalText(
      ctx, 
      "转发到群聊123", 
      (this.data.deviceWidth / 750) * 170,
      (this.data.deviceHeight / 1334) * 590,
      (this.data.deviceWidth / 750) * 30,
      'white',
      'left',
      'top'
    )
      


    // ctx.fillText('中谷四楼云数科技', 
    // (this.data.deviceWidth / 750) * 170, 
    // (this.data.deviceHeight / 1334) * 630)
    // ctx.setFontSize((this.data.deviceWidth / 750) * 22)
    // ctx.setFillStyle('#FFF')   
    
    // // 绘制图像到画布,右侧二维码
    // ctx.drawImage(
    //   code, 
    //   (this.data.deviceWidth / 750) * 470, 
    //   (this.data.deviceHeight / 1334) * 540,
    //   (this.data.deviceWidth / 750) * 100,
    //   (this.data.deviceWidth / 750) * 100)
    createdCanvasImage({    // 右侧小二维码
      ctx: ctx,   
      imgPath: code,
      moveX: (this.data.deviceWidth / 750) * 470,
      moveY: (this.data.deviceHeight / 1334) * 530,
      deviceWidth: (this.data.deviceWidth / 750) * 120,
      deviceHeight: (this.data.deviceWidth / 750) * 120,     
      setFillStyle: "#F00"
    })    

    // 渲染
    // ctx.draw()
    // saveKeepLast('myCanvas')


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
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})