var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{
        headerImg:"",
        xh:[],
        page:1
    }, 
    onLoad:function(){
        this.getChooseGoods();
    },
    onShow: function( e ) {
        wx.getSystemInfo( {
            success: ( res ) => {
                this.setData( {
                    windowHeight: res.windowHeight,
                    windowWidth: res.windowWidth
                })
            }
        })
    },
    getChooseGoods:function(){
    	let that = this;
    	let options = {
    		url:config.choose.goods,
    		method:"POST",
            data:{
                page_number:10,
                now_page:that.data.page
            }
    	};
    	util.request(options, function (res) {
	      let sliderImages =  res.data.data||[];   
	      that.setData({ 
	      	xh:res.data.data.arr_list||[],
            headerImg:res.data.data.cat_icon,
            page:that.data.page++
	      })
	      wx.hideToast();
	    })
    },
    changeContent:function(e){
    	wx.redirectTo({
    		url:"../hj/hj"
    	})
    },
    getDataFromServer:function(page){
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
        let that = this;
        let options = {
            url:config.choose.goods,
            data:{
                now_page:that.data.page||1,
                page_number:10
            },
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
        util.request(options,function(res){
            var arr = that.data.xh.concat(res.data.data.arr_list);
            that.setData({
                xh:arr,
                page:that.data.page++   
            })
            wx.hideToast();
        })
  },
  pullDownRefresh: function( e ) {
    console.log( "下拉刷新...." )
    this.setData({
        page:1
    })
    this.getChooseGoods();
    
  },

  pullUpLoad: function( e ) {
    this.setData( {
      page: this.data.page + 1
    })
    console.log( "上拉拉加载更多...." + this.data.page )
    this.getDataFromServer( this.data.page )
  }
})