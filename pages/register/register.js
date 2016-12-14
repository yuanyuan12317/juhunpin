var app = getApp();
Page({
	data:{
		userName:"",
		userPassword:"",
		userpwd:"",
		id_token:"",
		response:"",
		disabled:false,
		verifycode:"",
		buttonText:"获取验证码"
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
	userVerInput:function(){
		this.setData({
			verifycode:e.detail.value
		})
	},
	verification:function(){
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
			    	if(res.data.error == 1){
			    		wx.showToast({
						  title: res.data.message,
						  duration: 2000
						})
			    	}else{
			    		console.log(2222)
			    		var wait = 60;
					    function time() {
					        if (wait == 0) {
					        	console.log(111)
					            _self.setData({
					    			disabled:true,
					    			buttonText:"获取验证码"
					    		})      
					            wait = 60;
					        } else {
					        	console.log(333)
					           	_self.setData({
					    			disabled:false,
					    			buttonText:"重新发送(" + wait + ")"
					    		})
					            wait--;
					            setTimeout(function () {
					                time()
					            },1000)
					        }
					    }
					    time();
			    	}
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

		if(this.data.userName && (/^1[34578]\d{9}$/.test(this.data.userName))
			&&this.data.userPassword&&this.data.userpwd&&this.data.userpwd===this.data.userPassword){

			wx.request({
				url: 'http://api.7xyun.com/api/register',  
				header: {
	                'content-type': 'application/x-www-form-urlencoded'
	            },
			    method: 'POST',
			    data: {  
				   mobile: this.data.userName,  
			       password: this.data.userPassword, 
			       verifycode:this.data.verifycode 
			    },  
			    success:function(res){
			    	console.log(res.data)
			    	// var user = wx.getStorageSync('user')||{};
			    	// user = res.data.data;
			    	// wx.setStorageSync('user', user);
			    	if(res.data.error == 1){
			    		wx.showToast({
						  title: res.data.message,
						  duration: 2000
						})
			    	}else{
			    		wx.redirectTo({url: "../login/login"})
			    	}
			    	
			    }  
			})
		}	
	}

}) 