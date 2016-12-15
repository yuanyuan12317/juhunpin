module.exports = {
    appKey: "9emcn7gs9wx8c5i200yzdqlad3tb1d2m",
    index:{
    	slider:"http://api.7xyun.com/v3_1_0/index/adlist",
    	dayNews:"http://api.7xyun.com/v3_1_0/index/daily",
    	hj:"http://api.7xyun.com/v3_1_0/index/list",
    	likeGoods:"http://api.7xyun.com/v3_1_0/index/likegoods",
    	collectArticle:"http://api.7xyun.com/v2_1_0/user/collectarticle"
    },
    article:{
    	alsoLike:"http://api.7xyun.com/v2_1_1/article/aboutnews",
        getArticle: 'http://api.7xyun.com/v2_1_1/article/getarticlehtml'
    },
    choose:{
        goods:"http://api.7xyun.com/v3_1_0/goods/items",
        article:"http://api.7xyun.com/v3_1_0/article/articlelist"
    },
    classify:{
        classify:"http://api.7xyun.com/v2_1_1/goods/goodscate"
    },
    clubApi: {
        put: 'https://api.wxappclub.com/put',
        get: 'http://api.7xyun.com/v2_1_1/article/getarticlehtml',
        del: 'https://api.wxappclub.com/del',
        match: 'https://api.wxappclub.com/match',
        list: 'https://api.wxappclub.com/list',
        wxUser: 'https://api.wxappclub.com/wxUser'
    }
}