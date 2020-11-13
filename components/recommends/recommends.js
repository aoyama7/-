// components/recommend/recommends.js
Component({
  properties: {

  },
  data: {
    cover:[], // 接收服务器拿到的精选大图
    month:[], // 接收服务器拿到月份数据
    sURL:"http://119.29.12.250:3000/"
    // 这里是老师的服务器 可以更换
    // 但是我不懂老师的服务器是怎么传过来json的
  },
  lifetimes: {
    attached:function(){
      this.getCover()
      this.getMonth()
    }
  },
  methods: {
    getCover(){
      wx.request({
        url: 'http://119.29.12.250:3000/home/cover',
        // 重点 js箭头函数
        success :(res) => {
          // 打印服务器返回的数据
          // console.log(res.data.data)
          // 把数据更新到data里去
          this.setData({
            cover:res.data.data

          })
        }
      })
    },
    getMonth(){
      wx.request({
        url: 'http://119.29.12.250:3000/home/month',
        success:(res)=>{
          var months = res.data.data
          var getdate = res.data.data.date
          var date = new Date(getdate)
          var day=date.getDate(date)
          var month = date.getMonth()+1
          console.log(day)
          var month_msg = day+"/"+month+"月"
          console.log(month_msg)
          months.month_msg = month_msg;
          this.setData({
            month:months
          })
        }
      })



    }
  }
})
