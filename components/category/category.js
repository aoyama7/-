// components/category/category.js
Component({
  data: {
    list :[],// 定义接收到的数据
    sURL :"http://119.29.12.250:3000/"
  },
  methods: {
    getCategory(){
        wx.request({
          url: 'http://119.29.12.250:3000/category',
          success:(res)=>{
            this.setData({
              list:res.data.data
            })
          }
        })
    }
  },
  lifetimes: {
    // 在组件创建完毕开始请求数据
    attached: function() {
      this.getCategory()
    }
  }
})
