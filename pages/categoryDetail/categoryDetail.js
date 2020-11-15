// pages/categoryDetail/categoryDetail.js
Page({
  data: {
    //定义tabs选项卡标题数据
    titles:[{
      id:0,
      title:"最新",
      order:"new"
    },{
      id:1,
      title:'热门',
      order:"hot"
    }],
    //个页面传递过来的id
    id:" ",
    //定义数据请求时候的参数集合
    params:{
      skip:0,
      limit:12,
      order:'new'
    },
     //定义根路径
    sURL:"http://119.29.12.250:3000/",
    //定义数据总条数
    total:0,
    //接收服务器传递过来的数据 ---  数据银行，存储每一次数据请求返回的结果
    list:[]
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function (options) {
    // B页面负责接收 --- 在页面生命加载完的生命周期函数参数里获取；
    //console.log(options)
    this.setData({
       //存储分类页面传递过来的id
      id:options.id
    })
    this.getcategoryDetail()
  },
  getcategoryDetail(){
    //显示加载提示框
    wx.showLoading({
      title: '很快啊！',
    })
    wx.request({
       //在请求路径url中拼接分类页面拿到的id
      url: 'http://119.29.12.250:3000/category/'+this.data.id,
      data:this.data.params,
      success:(res)=>{
        //console.log(res.data.data)
        this.setData({
          //使用es6展开运算符把最新一次拿到的数据跟之前拿到的数据合并
          list:[...this.data.list,...res.data.data.list],
           //根据服务器返回的数据，更新data里的数据总条数
          total:res.data.data.total
        })
        //在数据请求成功以后隐藏加载提醒框
        wx.hideLoading()
      }
    })
  },
//触底事件 --- 重新发送请求获取数据
  scrolltolower(){
     //判断是否还有数据，没有的话提示用户，终止程序
    if(this.data.params.skip >= this.data.total){
      wx.showToast({
        title: '我是有底限的',
        icon:'none'
      })
      return;
    }
     //修改数据请求的参数 --- 每次对skip进行累加
    var params = this.data.params;
    params.skip +=12;
    this.setData({
      params:params
    })
     //重新调用数据
    this.getcategoryDetail()
  },
   //点击tabs选项卡 重新发起数据请求 ---- 注意 这是一次全新的数据请求，可以当成是重新加载了一次页面
  changeIndex(e){
        //console.log(e.detail)
        //通过事件对象，拿到tabs子组件传递过来的索引 --- 当前点击项的索引值
        var index = e.detail
        //数组的访问：访问数组第一项---》list[0]；第二项---》list[1] ----》已经能拿到当前点击项目的索引，我们就可以拿到当前项里的order属性值 ----》对象的点语法！
        var order = this.data.titles[index].order
        //拿到data里的params参数集合
        var params = this.data.params;
        //修改参数集合里的order取值
        params.order = order;
        //把params里的skip重置为0
        params.skip = 0;
        this.setData({
          //更新data里的params集合
          params:params,
          //清空list数据，以便重新向数组里存放数据
          list:[]
        })
        //console.log(this.data.params)
        //console.log(this.data.list)
        //调用数据请求的方法 
        this.getcategoryDetail()
  }

})