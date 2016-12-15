var util = require('./util')
var config = require('./config');

//根据articleid获取文章html
function getArticleHtml(params,cb){
    var option = {
        url: config.article.getArticle,
        method:"POST",
        header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
        data: {
        // appkey: config.appKey,
        id: params
        // type: "article_html"
      }
    };
    console.log(params)
    console.log(option)
    util.request(option, (res, err) => {
        if (err) {
            cb(err);
        } else {
            cb(res);
        }
    });
}

//根据分类id获取分类下所有文章信息
function getArticleListByCategoryId(params,cb){
    var option = {
        url: config.clubApi.list,
        data: {
        appkey: config.appKey,
        type: params
        }
    };
    util.request(option, (res, err) => {
        if (err) {
            cb(err);
        } else {
            cb(res);
        }
    });
}
module.exports={
    getArticleHtml:getArticleHtml,
    getArticleListByCategoryId:getArticleListByCategoryId
}