Page({
    data:{
        headerImg:'http://img1.7xyun.com/data/afficheimg/1480986092603068500.jpg'
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
                    console.log(data.arr_list);
						_this.setData({
							xh:data.arr_list||[],
                            headerImg:data.cat_icon,
							reqnum:++_this.data.reqnum		
						})
                    
						break;
				}
            }
        })
	},
  
    onLoad:function(){
        var _this = this;
        _this.request('http://api.7xyun.com/v3_1_0/goods/items',"POST","like")
        console.log(_this)
    }
})