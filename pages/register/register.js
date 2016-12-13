var app = getApp();
Page({
	data:{
		userName:"",
		userPassword:"",
		userpwd:"",
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
	verification:function(){
		console.log((/^1[34578]\d{9}$/.test(this.data.userName)))
		var _self = this;
		if(this.data.userName && (/^1[34578]\d{9}$/.test(this.data.userName))){
			wx.request({
				url: 'http://api.7xyun.com/api/sendmsg',  
				header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
			    method: 'POST',
			    data: {  
				   mobile: _self.data.userName,  
			       type: "register"  
			    },  
			    success:function(res){
			    	console.log(res.data)
			    	// var user = wx.getStorageSync('user')||{};
			    	// user = res.data.data;
			    	// wx.setStorageSync('user', user);
			    	// wx.redirectTo({url: "../my/my"})
			    }  
			})
		}else{
			wx.showToast({
			  title: '请输入有效的手机号码',
			  duration: 2000
			})
		}
	},
	userpwd:function(e){
		this.setData({
			userpwd:e.detail.value
		})
	},
	logIn:function(){
		var that = this;
		wx.request({
			url: 'http://api.7xyun.com/api/login',  
			header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
		    method: 'POST',
		    data: {  
			   mobile: this.data.userName,  
		       password: this.data.userPassword,  
		    },  
		    success:function(res){
		    	console.log(res.data)
		    	var user = wx.getStorageSync('user')||{};
		    	user = res.data.data;
		    	wx.setStorageSync('user', user);
		    	wx.redirectTo({url: "../my/my"})
		    }  
		})
	}

}) 