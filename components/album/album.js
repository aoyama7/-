// components/album/album.js
Component({
  data: {
     //定义根路径
    sURL:"http://119.29.12.250:3000/",
     //接收后台拿到的数据
    list:[],
     //定义数据请求参数集合
    params:{
      skip:0,
      limit:12
    }
  },
  methods: {
    getAlbum(){
      wx.request({
        url: 'http://119.29.12.250:3000/album',
        data: this.data.params,
        success:(res)=>{
          console.log(res.data.data)
          this.setData({
            //更新到data里去
            list:res.data.data.list
          })
        }
      })
    }
  },
  lifetimes:{
    //组件创建完成的时候触发
    attached: function() {
      //调用获取数据的方法
      this.getAlbum()
    }
  }
})
