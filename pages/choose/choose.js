var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{
        headerImg:"",
        xh:[]
    }, 
    onLoad:function(){
        this.getChooseGoods();
    },
    getChooseGoods:function(){
    	let that = this;
    	let options = {
    		url:config.choose.goods,
    		method:"POST"
    	};
    	util.request(options, function (res) {
	      let sliderImages =  res.data.data||[];   
	      that.setData({ 
	      	xh:res.data.data.arr_list||[],
            headerImg:res.data.data.cat_icon,
	      })
	      wx.hideToast();
	    })
    },
    changeContent:function(e){
    	wx.redirectTo({
    		url:"../hj/hj"
    	})
    }
})