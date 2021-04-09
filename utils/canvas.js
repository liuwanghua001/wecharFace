
  /** 绘制多行文本，自动换行，超出添加...
  @param str String 要绘制的字符串
  @param canvas Object canvas对象
  @param initX Number 绘制字符串起始x坐标
  @param initY Number 绘制字符串起始y坐标
  @param lineHeight Number 字行高，自己定义个值即可
  @param maxWidth Number 文本最大宽度
  @param row Number 最大行数
 **/
 function canvasTextAutoLine (str, ctx, initX, initY, lineHeight, maxWidth, row = 1) {
  var lineWidth = 0;
  var lastSubStrIndex = 0;
  var currentRow = 1;
  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width;
    if (lineWidth > maxWidth) {
      currentRow++;
      let newStr = str.substring(lastSubStrIndex, i)
      if (currentRow > row && str.length > i) {
        newStr = str.substring(lastSubStrIndex, i - 2) + '...'
      }
      ctx.fillText(newStr, initX, initY);
      initY += lineHeight;
      lineWidth = 0;
      lastSubStrIndex = i;

      if (currentRow > row) {
        break;
      }
    }
    if (i == str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
    }
  }
}

/**
 * 绘制只有一行的文字
 * @param ctx String 画布对象
 * @param str Number 要绘制的字符串
 * @param x Number 绘制文本的左上角 x 坐标位置
 * @param y Number 绘制文本的左上角 y 坐标位置
 * @param font Number 字体的字号
 * @param style String 填充的颜色，默认颜色为 black
 * @param align String 文字的对齐方式 left center right
 * @param baseLine String 文字的竖直对齐方式  top bottom middle
**/
function drawNormalText(ctx, str, x, y, font, style, align, baseLine) {
  ctx.setFontSize(font);
  ctx.setFillStyle(style);
  ctx.setTextAlign(align);
  ctx.setTextBaseline(baseLine);
  ctx.fillText(str, x, y);
  ctx.draw(true)
}


/**
 * 创建图片
 * @param imgPath String 图片路径
 * @param deviceWidth Number 设备的宽度
 * @param deviceHeight Number 设备的高度
 * @param moveX Number 移动X轴
 * @param moveY Number 移动Y轴
 * @param setFillStyle String 填充颜色
**/
 function createdCanvasImage({ctx, imgPath, deviceWidth, deviceHeight, moveX, moveY, setFillStyle}) {
  // let ctx = wx.createCanvasContext(canvasId)
  // ctx.drawImage(imgPath, 0, 0, 
  //   (this.data.deviceWidth / 750) * 600, 
  //   (this.data.deviceHeight / 1334) * 500);
  // ctx.setFillStyle('#090')
  ctx.drawImage(imgPath, moveX, moveY, deviceWidth, deviceHeight);
  ctx.setFillStyle(setFillStyle)
  ctx.draw(true)
}

/**
 * 创建矩形
 * @param X Number 矩形路径左上角的横坐标
 * @param Y Number 矩形路径左上角的纵坐标
 * @param deviceWidth Number 矩形路径的宽度
 * @param deviceHeight Number 矩形路径的高度
**/
function createdCanvasfillRect({ctx, X, Y, deviceWidth, deviceHeight}) {
  
  // // 创建一个矩形
  // ctx.fillRect(0, 
  //   (this.data.deviceHeight / 1334) * 500,
  //   (this.data.deviceWidth / 750) * 600, 
  //   (this.data.deviceHeight / 1334) * 350)
  // let ctx = wx.createCanvasContext(canvasId)
  ctx.fillRect(X, Y, deviceWidth, deviceHeight)
  ctx.draw(true)    
}

/**
 * 创建文字
 * @param text String 在画布上输出的文本
 * @param X Number 绘制文本的左上角 x 坐标位置
 * @param Y Number 绘制文本的左上角 y 坐标位置
 * @param FontSize Number 设置字体大小
 * @param setFillStyle String 填充颜色
**/
function createdCanvasImagefillText({ctx, text, X, Y, FontSize, setFillStyle}) {
  // ctx.fillText('转发到群聊',
  //   (this.data.deviceWidth / 750) * 170, 
  //   (this.data.deviceHeight / 1334) * 590)    
  //   ctx.setFontSize((this.data.deviceWidth / 750) * 25)
  //   ctx.setFillStyle('#FFF')
  // let ctx = wx.createCanvasContext(canvasId)
  ctx.fillText(text, X, Y)    
  ctx.setFontSize(FontSize)
  ctx.setFillStyle(setFillStyle)  
  ctx.draw(true)
}

// 保留上一次绘画的结果
function saveKeepLast(ctx) {
  // let ctx = wx.createCanvasContext(canvasId)
  ctx.draw(true)
}

// 生成图片保存到本地相册
function saveCanvasImage() {
  console.log("")
}

module.exports = {    
  createdCanvasImage,
  createdCanvasfillRect,
  createdCanvasImagefillText,
  saveCanvasImage,
  saveKeepLast,
  drawNormalText
}