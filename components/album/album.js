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
    },
    scrolltolower(){
      if(this.data.params.skip >= this.data.total){
        wx.showToast({
          title:'没有更多数据',
          icon:'none'
        })
        return
      }
      var params = this.data.params
      params.skip += 12
      this.setData({
        params:params
      })
      //调用获取数据的方法
       this.getAlbum()
    },
    //实现页面跳转
    goAlbumDetail(e){
       //console.log(e.currentTarget.dataset.index)
       //拿到当前这条数据的索引
       var index = e.currentTarget.dataset.index;
       //使用list[index]把当前这条数据拿到
       var item =   this.data.list[index]
       //console.log(item)
       //存储到小程序的数据共享里 
       var app = getApp()
       app.album = item
       //console.log(app.album)
       //使用js的方法实现页面跳转
       wx.navigateTo({
         url: '/pages/albumDetail/albumDetail',
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
