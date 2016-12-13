Page({
    data:{
        headerImg:'http://img1.7xyun.com/data/afficheimg/1480986092603068500.jpg',
		page:1,
		sort:"default"
    },
    request:function(data){
		var that = this;
		wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
   		wx.request({
            url: 'http://api.7xyun.com/v2_1_0/goods/goodslist', //仅为示例，并非真实的接口地址
            data:data,
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                that.setData({
                    xh:res.data.data.arr_list,
					page:that.data.page++	
                })
                wx.hideToast();
            }
        })
	},
 
  /** 
   * 点击tab切换 
   */  
	swichNav: function( e ) {  
		console.log(e.target.dataset.sort )
		var that = this;  
	
		if( this.data.sort === e.target.dataset.sort ) {  
			return false;  
		}else {  
			that.setData( {  
				sort: e.target.dataset.sort  
			})  
		} 

		this.setData({
			page:1,
			sort:e.target.dataset.sort
		})

		var	data ={
				category_id:that.data.category_id,
				now_page:that.data.page||1,
				page_number:10,
				sort:that.data.sort || "",
				order:that.data.order || "" 
			}
			
		 if(e.target.dataset.sort =="price"){
			wx.showActionSheet({
				itemList: ['由高到低', '由低到高'],
				success: function(res) {
					if (!res.cancel) {
						if(res.tapIndex==0){
							console.log(res.tapIndex)
							// data.order="desc";	
							that.setData({
								order:'desc'
							})	
						}else{
							console.log(res.tapIndex)
							// data.order="asc";
							that.setData({
								order:'asc'
							})	
						}
						console.log(that.data.order)
						that.request(data);	
					}
				}
			})
		 }else{
			  that.request(data);	
		 }
	},
    onLoad:function(options){
        var that = this;
		var data ={
				category_id:options.category_id,
				now_page:that.data.page,
				page_number:10
			} 
			that.setData({
				category_id:options.category_id
			})
         that.request(data);
    },
	onShow: function( e ) {
		wx.getSystemInfo( {
		success: ( res ) => {
			this.setData( {
			windowHeight: res.windowHeight,
			windowWidth: res.windowWidth
			})
		}
		})
  },
  getDataFromServer:function(page){
	 var that = this;
	 	wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
	  var data ={
			category_id:that.data.category_id,
			now_page:that.data.page||1,
			page_number:10,
			sort:that.data.sort || "",
			order:that.data.order || "" 
		  }
	
   		wx.request({
            url: 'http://api.7xyun.com/v2_1_0/goods/goodslist', //仅为示例，并非真实的接口地址
            data:data,
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
				console.log(res.data)
				var arr = that.data.xh.concat(res.data.data.arr_list);
				console.log(arr)
                that.setData({
                    xh:arr,
					page:that.data.page++	
                })
                wx.hideToast();
            }
        })
  },
  pullDownRefresh: function( e ) {
    console.log( "下拉刷新...." )
	this.setData({
		page:1
	})
	var	data ={
			category_id:this.data.category_id,
			now_page:this.data.page||1,
			page_number:10,
			sort:this.data.sort || "",
			order:this.data.order || "" 
		} 
    this.request(data)
	
  },

  pullUpLoad: function( e ) {
    this.setData( {
      page: this.data.page + 1
    })
    console.log( "上拉拉加载更多...." + this.data.page )
    this.getDataFromServer( this.data.page )
  },
})