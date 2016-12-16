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
	      url: config.qa.question,
	      method:"POST",
	      header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
	      data: {
            now_page:1,
            page_number:10,
            type:1
          }
	    }
  		if(user){
  			options.data.token = user.token;
  		}
	    util.request(options, function (res) {
	      that.setData({ 
			qa: res.data.data.arr_list||[],
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