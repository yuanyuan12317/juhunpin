var util = require("../../utils/util.js")
var config = require("../../utils/config.js")
var app = getApp();
Page({
	data:{reqnum:0},
	slider:function(order){
		var _this = this;
		for (var i = 0; i < order.length; ++i) {
			if (order[i] === _this.data.toView) {
				i = i<order.length-1 ? i : 0;
				this.setData({
					toView: order[i + 1]
				})
				break
			}
    	}
	},
	onLoad: function(options) {
		 var _this = this;
		 // wx.showToast({
   //          title: '加载中',
   //          icon: 'loading',
   //          duration:100000
   //      })
		 // this.getShowImg();
		 // this.getDayNews();
		 // this.getHj();
		 // this.likeGoods();
	},
	onShow: function(options){
		 var _this = this;
		 wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
		 this.getShowImg();
		 this.getDayNews();
		 this.getHj();
		 this.likeGoods();
	},
	// 轮播图
	getShowImg: function () {
	    let that = this;
	    let options = {
	      url: config.index.slider,
	      method:"POST",
	      data: {}
	    }
	    util.request(options, function (res) {
	      let sliderImages =  res.data.data||[];   
	      that.setData({ sliderImages: sliderImages })
	      wx.hideToast();
	    })
  	},
  	// 每日播报
  	getDayNews: function(){
  		let that = this;
	    let options = {
	      url: config.index.dayNews,
	      method:"POST",
	      data: {}
	    }
	    util.request(options, function (res) {
	        let dayNews = res.data.data.arr_list||[]; 
	        let toView = "w"+dayNews[0].article_id; 
	        that.setData({ 
	      	  dayNews : dayNews,
			  toView : toView
	        })
	        var order = [];
			for(var i=0;i<dayNews.length;i++){
				order.push("w"+dayNews[i].article_id);
			}
			setInterval(function(){
				that.slider(order);
			},3000)
			wx.hideToast();
	    })
  	},
  	//每日优选、攻略
  	getHj: function(){
  		let that = this;
  		let user = wx.getStorageSync('user');
  		let options = {
	      url: config.index.hj,
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
	      let data =  res.data.data||[];  
	      let gl = data.article_list.arr_list; 
	      console.log(data)
	      var obj = {};
	      for(var i=0;i<gl.length;i++){
	      		obj[gl[i].article_id]= [gl[i].is_collected,gl[i].collect_num]
	      }
	      that.setData({ 
	      	yx: data.goods_list.arr_list||[],
			gl: gl||[],
			like:obj
	      })

	      console.log(that.data.like)
	      wx.hideToast();
	    })
  	},
  	//也许喜欢
  	likeGoods: function(){
  		let that = this;
  		let options = {
	      url: config.index.likeGoods,
	      method:"POST",
	      header: {
                'content-type': 'application/x-www-form-urlencoded'
          },
	      data: {
	      	page_number:10,
	      	now_page:1
	      }
	    };
	    util.request(options, function (res) {
	      that.setData({ 
	      	xh:res.data.data.arr_list||[],
	      })
	      wx.hideToast();
	    })
  	},
  	tapName: function(event) {
  		let that = this;
  		let user = wx.getStorageSync('user');
  		console.log(event)
			if(user){
				console.log(event.target.dataset["src"]);
				var type = 1;
				if(event.target.dataset["src"]=="true"){
					console.log(event.target.dataset["src"]);
					type = 2;
					// that.setData({
					// 	like[event.target.id]:[false,this.data.like[event.target.id][1]--]
					// })
				}else{
					type = 1;
					// that.setData({
					// 	like[event.target.id]:[true,this.data.like[event.target.id][1]++]
					// })
				}
				let options = {
					url: config.index.collectArticle,
					method:"POST",
					header: {
		                'content-type': 'application/x-www-form-urlencoded'
		          	},
		          	data: {
				      	token:user.token,
				      	article_id:event.target.id,
				      	opration:type
				    }
				};
				util.request(options, function (res) {
			     	console.log(res.data)
			      	wx.showToast({
			            title: res.data.message,
			            duration:1000
			        })
			        wx.redirectTo({
						url:"../index/index"
					})
			    })
				
			}else{
				wx.navigateTo({
					url:"../login/login"
				})
			}
			return false;
	},
})


