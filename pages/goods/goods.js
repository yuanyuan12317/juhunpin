var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
	data:{},
	onLoad :function(options){
        this.setData({
            title:options.title
        })
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
        var data = {good_id:options.type}
        this.getGoodDetail(data);
	},
    onReady:function(options){
        let that = this;
        wx.setNavigationBarTitle({
            title:that.data.title
        })
    },
    getGoodDetail:function(data){
        let that = this;
        let user = wx.getStorageSync('user');
        let options = {
            url:config.goods.goodsDetail,
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data:data
        };
        if (user) {
            options.token = user.token;
        }
        console.log(options)
        util.request(options,function(res){
            console.log(res.data)
            that.setData({
                goodDetail:res.data.data
            })
            wx.hideToast();
        })
    }
})