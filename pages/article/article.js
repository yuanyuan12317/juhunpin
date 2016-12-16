"use strict"
var WxParse = require('../../wxParse/wxParse.js');
var config = require("../../utils/config.js");
var util = require("../../utils/util.js");
var db = require("../../utils/db.js");

Page({
    data:{
        isLoading:true,
        title:"",
        headerImg:"",
        svLike:[]
    },
    onLoad: function(options) {
        this.setData({
          title:options.title
        })
        let articleId = options.type;
        let data = {
             cat_id : options.cat_id,
             article_id : options.type
            }
        this.getAlsoLike(data);
        this.getArticleHtml(articleId);
    },
    onReady:function(options){
        let that = this;
        wx.setNavigationBarTitle({
            title:that.data.title
        })
    },
  getAlsoLike:function(data){
    let that = this;
    let options = {
      url: config.article.alsoLike,
      method:"POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: data
    }
    util.request(options, function (res) {
        that.setData({ 
          svLike:res.data.data
        })
        wx.hideToast();
    })
  },

  getArticleHtml: function (options) {
    let that = this;
    db.getArticleHtml(options, (res, err) => {
      let article;
      if (res.data.data != undefined) {
        article = res.data.data.content;
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
            headerImg:res.data.data.head_image,
            authorPic:res.data.data.author_pic,
            authorName:res.data.data.author_name,
            pubtime:res.data.data.pubtime,
            title:res.data.data.title
        })
        wx.hideToast();
      } else {
        wx.showToast({
          title: '跳转失败',
          duration: 1000
        })
        wx.navigateBack({
          delta: 1, // 回退前 delta(默认为1) 页面
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
      }
    })
  }

})