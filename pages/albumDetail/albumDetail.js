// pages/albumDetail/albumDetail.js
Page({
  data: {
    album:{},
    sURL:"http://119.29.12.250:3000/",
    // 请求参数集合
    params:{
      skip:0,
      limit:12
    },
    list:[],
    total:0
  },

  onLoad: function (options) {
    // 从小程序的数据共享里 取到专辑列表页面存进去的数据
    var app = getApp();
    // console.log(app.album)
    this.setData({
      album:app.album
    })
    // 页面加载完成就发起数据请求
    this.getAlbumList()
  },
  getAlbumList(){
    // 拿到专辑列表页传递过来的id
    var id = this.data.album.id
    // 显示数据加载提醒窗口
    wx.showLoading({
      title: '正在加载了\t正在加载了',
    })
    wx.request({
      url: 'http://119.29.12.250:3000/album/'+id,
      // 拼接上数据请求的参数
      data:this.data.params,
      success:(res)=>{
        // console.log(res.data.data)
        this.setData({
          // 使用展开运算符实现数组合并，把每次请求获取的数据拼接到一起
          list:[...this.data.list,...res.data.data.list],
          total:res.data.data.total
        })
        // 隐藏数据加载提醒窗口
        wx.hideLoading()
      }
    })
  },
  // 使用页面自身的触底事件来实现分页
  onReachBottom(){
    if(this.data.params.skip >= this.data.total){
      wx.showToast({
        title:'没有更多数据啦',
        icon:'none'
      })
      return
    }
    // 修改数据请求的参数
    var params = this.data.params
    params.skip += 12
    this.setData({
      params:params
    })

    this.getAlbumList()

  }


  
})