var app = getApp();

Page({
    data: {num:0},
    request:function(data,key){
		var _this = this;
		wx.request({
            url: 'http://api.7xyun.com/user/collectlist', //仅为示例，并非真实的接口地址
            data: data,
            header: {
	            'content-type': 'application/x-www-form-urlencoded'
	        },
			method:'POST',
            success: function(res) {
                var data1 = res.data.data.arr_list || [];
				switch (key) {
                    case "hj":
					    console.log(data)
						_this.setData({
							gl:data1,
							page:_this.data.hjpage++		
						})
						break;
					case 'xh':
						_this.setData({
							xh:data1,
							page:_this.data.yxpage++			
						})
						break;
				}
            }
        })
	},
    toggle:function(event){
        var _this = this;
        console.log(event);
        if (event.target && event.target.dataset){
            _this.setData({
                num :event.target.dataset["num"]
            })
        }

    },
    showTel:function (){
    	 wx.makePhoneCall({
		      	phoneNumber: '18610853548'
		      })
    },
    quit:function(){
    	wx.showModal({
		  title: '提示',
		  content: '您确定退出当前账号？',
		  confirmColor :'#ff5777',
		  success : function(res) {
		    if (res.confirm) {
		      try {
				  wx.removeStorageSync('user');
				  // wx.navigateTo({url: "../index/index"})
				  wx.onHide();
				} catch (e) {
				 
				}
		    }
		  }
    	})
    },
    onLoad:function(){
        var _self = this;
     	var user = wx.getStorageSync('user');
     	if(user){
	     	console.log(user)
	     	_self.setData({
                avatarUrl:user.user_picture,
                nickName:user.nick_name,
                weddingday:user.weddingday
            })
            var hj = {
	            	token:user.token,
	            	type:3
	            }
            var xh = {
	            	token:user.token,
	            	type:1
            	}
            _self.request(xh,'xh')
            _self.request(hj,'hj')	
		}else{
			wx.redirectTo({url: "../login/login"})
		}

	},
})