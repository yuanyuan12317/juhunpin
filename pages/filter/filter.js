var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{
        headerImg:'http://img1.7xyun.com/data/afficheimg/1480986092603068500.jpg',
		page:1,
		sort:"default"
    },
    request:function(data){
    	wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration:100000
        })
		let that = this;
        let options = {
        	url: config.classify.filter,
            data:data,
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        }
        util.request(options,function(res){
        	that.setData({
                xh:res.data.data.arr_list,
				page:that.data.page++	
            })
            wx.hideToast();
        })
	},
 
  /** 
   * 点击tab切换 
   */  
	swichNav: function( e ) {  
		var that = this;  
		if( this.data.sort === e.target.dataset.sort && e.target.dataset.sort!="price") {  
			return false;  
		}else {  
			this.setData({
				page:1,
				sort:e.target.dataset.sort
			})
			let	data ={
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
								data.order = 'desc';
								that.setData({
									order:'desc'
								})	
							}else{
								data.order = 'asc';
								that.setData({
									order:'asc'
								})	
							}
							that.request(data);	
						}
					}
				})
			 }else{
				  that.request(data);	
			 }
		} 

	},
    onLoad:function(options){
        let that = this;
		let data ={
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
  	wx.showToast({
	    title: '加载中',
	    icon: 'loading',
	    duration:100000
	})
    let that = this;
	let options = {
		url:config.classify.filter,
		data:{
			category_id:that.data.category_id,
			now_page:that.data.page||1,
			page_number:10,
			sort:that.data.sort || "",
			order:that.data.order || "" 
	  	},
	    method:"POST",
	    header: {
	        'content-type': 'application/x-www-form-urlencoded'
	    }
	}
	util.request(options,function(res){
		var arr = that.data.xh.concat(res.data.data.arr_list);
        that.setData({
            xh:arr,
			page:that.data.page++	
        })
        wx.hideToast();
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