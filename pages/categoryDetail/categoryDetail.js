Page({
  data: {
    // 拿到上个页面床底过来的id
    id:" ",
  },
  // 生命周期函数 监听页面加载
  onLoad: function (options) {
 // B页面负责接收 在页面生命加载完的生命周期函数参数里获取；
 this.setData({
   id:options.id
 })
  console.log(this.data.id)
  },

})