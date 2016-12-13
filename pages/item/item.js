Page({
    data:{
        isLoading:true,
        title:"",
        headerImg:"",
        svLike:[]
    },
    // upLoade:function(){
    //     wx.chooseImage({
    //         success: function(res) {
    //             var tempFilePaths = res.tempFilePaths
    //             wx.uploadFile({
    //                 url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
    //                 filePath: tempFilePaths[0],
    //                 name: 'file',
    //                 formData:{
    //                     'user': 'test'
    //                 },
    //                 success: function(res){
    //                     var data = res.data
    //                     //do something
    //                 }
    //             })
    //         }
    //     })
    // },
     onLoad: function(options) {
        var that = this;
        console.log(options)
        wx.setNavigationBarTitle({
            title:options.title
        })
        var data = {
                cat_id : options.cat_id,
                article_id : options.type
            }
        wx.request({
            url: 'http://api.7xyun.com/v2_1_1/article/aboutnews', //仅为示例，并非真实的接口地址
            data:data,
            method:"POST",
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res) {
                console.log(res.data)
                that.setData({
                    svLike:res.data.data
                })
            }
        })
  }
})