var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

var app = getApp();
Page({
	data:{
		userName:"",
		userPassword:"",
		id_token:"",
		response:""
	},
	userNameInput:function(e){
		this.setData({
			userName:e.detail.value
		})
	},
	userPasswordInput:function(e){
		this.setData({
			userPassword:e.detail.value
		})
	},
	logIn:function(){
		let that = this;
		let options = {
			url: config.login.login,  
			header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
		    method: 'POST',
		    data: {  
			   mobile: this.data.userName,  
		       password: this.data.userPassword,  
		    }
		}
		util.request(options,function(res){
			var user = wx.getStorageSync('user')||{};
			user = res.data.data;
			wx.setStorageSync('user', user);
			wx.redirectTo({url: "../my/my"})
		})


		// wx.request({
		// 	url: 'http://api.7xyun.com/api/login',  
		// 	header: {
  //               'content-type': 'application/x-www-form-urlencoded'
  //           },
		//     method: 'POST',
		//     data: {  
		// 	   mobile: this.data.userName,  
		//        password: this.data.userPassword,  
		//     },  
		//     success:function(res){
		//     	console.log(res.data)
		//     	var user = wx.getStorageSync('user')||{};
		//     	user = res.data.data;
		//     	wx.setStorageSync('user', user);
		//     	user = wx.getStorageSync('user')||{};
		//     	console.log(user);
		//     	wx.redirectTo({url: "../my/my"})
		//     	// wx.navigateBack({delta: 1})
		//     }  
		// })
	}

}) 