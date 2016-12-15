var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{
        headerImg:"",
        gl:[]
    },
    onLoad:function(){
        this.getChooseArticle();
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
    }
})