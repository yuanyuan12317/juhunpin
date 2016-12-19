var util = require("../../utils/util.js")
var config = require("../../utils/config.js")

Page({
    data:{
        headerImg:"",
        gl:[],
        src: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        voiceImg:"../../imgs/voice3.png"
    },
    onLoad:function(){
        this.getChooseArticle();
    },
    onReady: function (e) {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
      this.audioCtx = wx.createAudioContext('myAudio')
    },
    getChooseArticle:function(){
    	let that = this;
    	let user = wx.getStorageSync('user');
    	let options = {
	      url: config.qa.question,
	      method:"POST",
	      header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
	      data: {
            now_page:1,
            page_number:10,
            type:1
          }
	    }
  		if(user){
  			options.data.token = user.token;
  		}
	    util.request(options, function (res) {
	      that.setData({ 
			qa: res.data.data.arr_list||[],
	      })
	      wx.hideToast();
	    })
    },
    changeContent:function(e){
    	wx.redirectTo({
    		url:"../choose/choose"
    	})
    },
    voiceImg : function ($ele) {
        var count = 0;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            count = count++ > 3 ? 1 : count;
            
        },300)
    },
    gotoPlay: function (e) {  
        var that = this;
        var filePath = e.currentTarget.dataset.src;  
        console.log(filePath)
        this.setData({src:filePath})
     
        //点击开始播放  
        wx.showToast({  
          title: '开始播放',  
          icon: 'success',  
          duration: 1000  
        })  

        this.audioCtx.play();

        console.log( this.audioCtx.play())

        // var count = 0,timer = null;
        // clearInterval(timer);
        // timer = setInterval(function () {
        //     count = count++ > 3 ? 1 : count;
        //     that.setData({
        //         voiceImg:"../../imgs/voice"+count+".png"
        //     })
        // },300)
   


    }  
})  
