var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{},
	onLoad: function(options) {
		wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
        this.getClassify();	
	},
    getClassify:function(){
        let that = this;
        let options = {
            url:config.classify.classify,
            method:"POST",
        };
        util.request(options, function (res) {
            that.setData({
                fl:res.data.data ||[]
            })
            wx.hideToast();
        })
    }

})