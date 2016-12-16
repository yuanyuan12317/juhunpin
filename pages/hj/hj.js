var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{
        headerImg:"",
        gl:[],
        page:1
    },
    onLoad:function(){
        this.getChooseArticle();
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
    getChooseArticle:function(){
    	let that = this;
    	let user = wx.getStorageSync('user');
    	let options = {
	      url: config.choose.article,
	      method:"POST",
	      header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
	      data: {}
	    }
  		if(user){
  			options.data.token = user.token;
  		}
	    util.request(options, function (res) {
	      that.setData({ 
	      	headerImg: res.data.data.cat_icon||"",
			gl: res.data.data.arr_list||[],
	      })
	      wx.hideToast();
	    })
    },
    changeContent:function(e){
    	wx.redirectTo({
    		url:"../choose/choose"
    	})
    },
    getDataFromServer:function(page){
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
        let that = this;
        let user = wx.getStorageSync('user');
        let options = {
          url: config.choose.article,
          method:"POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
             now_page:that.data.page||1,
             page_number:10
          }
        }
        util.request(options,function(res){
            console.log( that.data.gl)
            var arr = that.data.gl.concat(res.data.data.arr_list);
            that.setData({
                headerImg: res.data.data.cat_icon||"",
                gl: arr||[],
            })
            wx.hideToast();
        })
  },
  pullDownRefresh: function( e ) {
    console.log( "下拉刷新...." )
    this.setData({
        page:1
    })
    this.getChooseArticle();
    
  },

  pullUpLoad: function( e ) {
    this.setData( {
      page: this.data.page + 1
    })
    console.log( "上拉拉加载更多...." + this.data.page )
    this.getDataFromServer( this.data.page )
  }
})