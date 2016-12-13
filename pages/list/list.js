Page({
    data:{},
	 onLoad: function(options) {
		 var _this = this;
		//  wx.showToast({
        //     title: '加载中',
        //     icon: 'loading',
        //     duration:100000
        // })
        wx.request({
            url: "http://api.7xyun.com/v2_1_1/goods/goodscate", //仅为示例，并非真实的接口地址
            data: {},
            header: {
                'Content-Type': 'application/json'
            },
			method :"POST",
            success: function(res) {
                var data = res.data.data || [];
				console.log(data)
				_this.setData({
                    fl:data
                })
            }
        })
		
	}

})