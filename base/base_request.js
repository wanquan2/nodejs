/*
** 获取浏览器端请求参数
*/

const url = require('url');
const querystring = require("querystring");

const getrequest = {
    get:function(request){//get请求
        let urls = new url.URL(`${request.headers.referer + request.url}`);
        return querystring.parse(urls.search.replace("?",""));
    },
    post:function(request){//post请求
        return new Promise(function(resolved,rejected){
            request.on('data',function(data){
                resolved(querystring.parse(data.toString()));
            })
        })
    }
}

module.exports = getrequest