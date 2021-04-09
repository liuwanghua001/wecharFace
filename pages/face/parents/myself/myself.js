import { valdateLoginStatus } from '../../../../request/global'
import { parentsQuota , parentsUnbundling} from '../../../../request/api'
import { publicSigns } from '../../../../utils/util'



Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginInfo: {
      shcoolName: "", // 学校名称
      ClassName: "", // 班级名称
      GradeName: "", // 年级名称
      FSTName: "" // 小孩名称
    },
    chooseSize: false, //控制弹窗
    PopupID: '',       //弹窗id
    FSTuid:'',         //学生id 
    FSLimitAmount:'0',  //限购
    FSLimitCount:'0',   //限次
    FSOrgId:'',         //机构id
    FSTStatus:'',       //学生状态显示
  },
  FSLimitAmount:function(e){
    this.setData({
      FSLimitAmount:e.detail.value
    })
  },
  FSLimitCount:function(e){
    this.setData({
      FSLimitCount:e.detail.value
    })
  },
  // 显示遮罩层
  showshadow: function (e) {
    console.log(e.currentTarget);
    if (e.currentTarget.id === '1') {
      this.setData({
        PopupID: '1'
      })
      // if(this.data.FSTStatus==4){
      //   wx.showToast({
      //     title: '已解绑,无法限购',
      //     icon:"none"
      //   })
      //   return
      // }
    } else {
      this.setData({
        PopupID: '2'
      })
      // if(this.data.FSTStatus==4){
      //   wx.showToast({
      //     title: '已解绑',
      //     icon:"none"
      //   })
      //   return
      // }
    }
    console.log(this.data.PopupID);
    if (this.data.chooseSize == false) {
      this.chooseSezi()
    } else {
      this.hideModal()
    }
  },

  // 动画函数
  chooseSezi: function (e) {
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(1000).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动 滑动时间
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        clearcart: false
      })
    }, 100)
  },
  // 隐藏
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(700).step()
    that.setData({
      animationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 500)
  },
  clonseBox: function () {
    this.setData({
      chooseSize: false
    })
  },
  Jump: function () {
    wx.navigateTo({
      url: '../update/update',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let faceInfoData = wx.getStorageSync("faceInfoData");
    console.log(faceInfoData);
    this.setData({
      FSTuid:faceInfoData.FSTUID,
      FSOrgId:faceInfoData.FSOrgId,
      FSTStatus:faceInfoData.FSTStatus
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 家长切换帐号
  accountLogout() {
    console.log("切换帐号")
    let parentsInfo = wx.clearStorageSync("parentsInfo")
    let FSTStatus = wx.clearStorageSync("FSTStatus")
    console.log(parentsInfo)
    if (!parentsInfo && !FSTStatus) {
      wx.showToast({
        title: '退出登录成功',
      })
      wx.redirectTo({
        url: '/pages/face/login/login',
      })
    }

  },
  //限购
  confirmQuota(){
    console.log("study buy:" , this.data.FSTuid)
    let paramsChangSign={
      FSTUID:this.data.FSTuid,
      FSLimitAmount:this.data.FSLimitAmount,
      FSLimitCount:parseInt(this.data.FSLimitCount),
    }
    // console.log("type;" , typeof this.data.FSLimitCount)
    let params={
      FSTUID: this.data.FSTuid,
      FSLimitAmount: this.data.FSLimitAmount,
      FSLimitCount: parseInt(this.data.FSLimitCount),
      Sign:publicSigns(paramsChangSign),
    }
    console.log("params to:",params)
    // console.log(this.data.FSLimitAmount);
    // console.log(this.data.FSLimitAmount*parseInt(this.data.FSLimitCount));
    if(this.data.FSLimitAmount<100&&this.data.FSLimitAmount*parseInt(this.data.FSLimitCount)<'1000'){
    parentsQuota(params).then(res=>{
      // console.log(res)
      if(res.Code==200){
        this.hideModal();
        wx.showToast({
          title: '设置限购成功',
        })
      }else{
        console.log(res);
      }
    })
  }else{
    this.hideModal();
    wx.showToast({
      title: '请输入数字或超出限额范围',
      icon:"none"
    })
  }
  },
  //解绑
  confirmbtn(){
    let paramsChangSign={
      FSTUID:this.data.FSTuid,
      FSOrgId	:this.data.FSOrgId,
    }
    let params={
      FSTUID:this.data.FSTuid,
      FSOrgId	:this.data.FSOrgId,
      Sign:publicSigns(paramsChangSign)
    }
    parentsUnbundling(params).then(res=>{
      if(res.Code==200){
        this.hideModal();
        wx.showToast({
          title: '解绑成功',
        })
        let faceInfoData = wx.getStorageSync("faceInfoData");
        faceInfoData.FSTStatus=4;
        wx.setStorageSync('faceInfoData', faceInfoData);
      }
      
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const parentsInfo = wx.getStorageSync("cookieUser")
    console.log(parentsInfo.ClassName)
    this.setData({
      loginInfo: {
        shcoolName: parentsInfo.shcoolName, // 学校名称
        ClassName: parentsInfo.ClassName, // 班级名称
        GradeName: parentsInfo.GradeName, // 年级名称
        FSTName: parentsInfo.FSTName
      }
    })

    console.log("获取家长缓存信息", this.data.loginInfo)
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