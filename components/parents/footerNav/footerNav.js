// source/components/parents/footerNav/footerNav.js
Component({
  // 在组件定义时的选项中启用多slot支持
  options:{
          
  },
  /**
   * 组件的属性列表
   */
  properties: {
    currentStuds: {
      type: String,
      val: "" 
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    footerNav:[
      {id:"0", fonts:"icon-shouye", title:"首页", "url":"/pages/face/parents/index/index"},
      {id:"1", fonts:"icon-dingdan", title:"订单" ,"url":"/pages/face/parents/order/order"},
      {id:"2", fonts:"icon-wode", title:"我的" ,"url":"/pages/face/parents/myself/myself"}
    ],
    status:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    currentNav (val){      
      console.log("当前点击的", val.currentTarget.dataset.id)
      this.setData({
        status: val.currentTarget.dataset.id
      })
      console.log("获取satus:", this.data.status)
    }
  },
  lifetimes: {
    attached(){
      // console.log("attached:",this.data)
    }
  }
})
