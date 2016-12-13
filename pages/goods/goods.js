Page({
	data:{
	},
	onLoad :function(options){
		var that = this;
        wx.setNavigationBarTitle({
            title:options.title
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })

        var data = {good_id:options.type}
        console.log(data)
        wx.request({
            url: 'http://api.7xyun.com/v2_1_1/goods/tb_detail', //仅为示例，并非真实的接口地址
            data:data,
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    goodDetail:res.data.data
                })
                wx.hideToast();
            }
        })
	}
})