var app = getApp();

Page({
	data:{reqnum:0},
	tapName: function(event) {
			// console.log(this.data.gl["is_like"]);
			// this.gl["is_like"] = !this.data.gl["is_like"];
			console.log(event.target.dataset["src"]);
			console.log(event.target.src)
			return false;
		},
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
	request:function(url,method,key){
		var _this = this;
		wx.request({
            url: url, //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
			method:method,
            success: function(res) {
                var data = res.data.data || [];
				switch (key) {
					case "sliderImages":
						_this.setData({
							sliderImages:data,
							reqnum:++_this.data.reqnum
						})
						break;
					case "dayNews":
						_this.setData({
							dayNews:data.arr_list||[],
							toView: "w"+data.arr_list[0].article_id	,
							reqnum:++_this.data.reqnum	
						})
						var order = [];
						for(var i=0;i<data.arr_list.length;i++){
							order.push("w"+data.arr_list[i].article_id);
						}
						setInterval(function(){
							_this.slider(order);
						},2000)
						break;
					case "hj":
					console.log(data)
						_this.setData({
							yx:data.goods_list.arr_list||[],
							gl:data.article_list.arr_list||[],
							reqnum:++_this.data.reqnum	
						})
						break;
					case 'like':
						_this.setData({
							xh:data.arr_list||[],
							reqnum:++_this.data.reqnum		
						})
						break;
				}
				_this.data.reqnum == 4 && wx.hideToast();
            }
        })
	},	

	 onLoad: function(options) {
		 var _this = this;
		 wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
		_this.request('http://api.7xyun.com/v3_1_0/index/adlist',"POST","sliderImages")
		_this.request('http://api.7xyun.com/v3_1_0/index/daily',"POST","dayNews")
		_this.request('http://api.7xyun.com/v3_1_0/index/list',"POST",'hj')
		_this.request('http://api.7xyun.com/v3_1_0/index/likegoods',"POST","like")
	}
})


