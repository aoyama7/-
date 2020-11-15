// components/recommend/recommends.js
Component({
  properties: {
  },
  data: {
    cover:[], // 接收服务器拿到的精选大图
    month:[], // 接收服务器拿到月份数据
    list:[],
    total:0,
    sURL:"http://119.29.12.250:3000/",
    // 这里是老师的服务器 可以更换
    // 但是我不懂老师的服务器是怎么传过来json的
    params:{
      skip:0,
      limit:12
    }
  },
  lifetimes: {
    attached:function(){
      this.getCover()
      this.getMonth()
      this.getHot()
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



    },
    getHot(){
      wx.request({
        url: 'http://119.29.12.250:3000/home/hot?',
        data:this.data.params,
        success:(res)=>{
        // console.log(res)
        // console.log(res.data.data)
        console.log(res.data)
          this.setData({
            list:[...this.data.list,...res.data.data.list],
            total:res.data.data.total
          })
        }
      })
    },
    scrolltolower(){
      // 判断是否还有数据，没有的话提示用户
      if(this.data.params.skip >= this.data.total){
        // 使用微信提示框提示用户没有更多数据
        wx.showToast({
          title: '还拉呢？👴都被扒光了',
          icon:'none'
        })
        return
        // 终止程序，代码不再往下运行
      } 
      var params = this.data.params
      // 在请求之前，先修改请求参数
      params.skip += 12
      this.setData({
        params:params
      })
      console.log(params)
      this.getHot()
    } 
  }



})
