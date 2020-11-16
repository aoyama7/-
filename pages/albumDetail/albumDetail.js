// pages/albumDetail/albumDetail.js
Page({
  data: {
    album:{},
    sURL:"http://119.29.12.250:3000/"
  },

  onLoad: function (options) {
    // 从小程序的数据共享里 取到专辑列表页面存进去的数据
    var app = getApp();
    console.log(app.album)
    this.setData({
      album:app.album
    })
  }


  
})