const http = require("http");
const fs = require("fs");
const urljs = require("url");
const querystring = require("querystring");
const connection = require('./base/connect_database')
const baseconfig = require('./base/base_config')

let SESSION = '';

let list = [{
    id:1,
    name:"卫青",
    job:"大将军"
},{
    id:2,
    name:"李靖",
    job:"军神"
}];

const serve = http.createServer();

serve.on("request",function(request,response){
    let url = request.url;
    let method = request.method;
    if(url == '/' || url.lastIndexOf(".html") > -1){//html页面
        url = url == '/' ? '/index.html' : url;
        fs.readFile(`./web${url}`,function(err,data){
            let li = '';
            let html = '';
            list.forEach(item => {
                li += `<li>${item.name}</li>`;
            })

            html = data.toString().replace("{list}",li);
            response.writeHead(200,baseconfig.writeHeadsHtml)
            response.end(html)
        })
    } else if(url.indexOf('/api/') > -1){//接口前缀
        let parm = {};
        let cookie = request.headers.cookie;
        
        if(url == '/api/login'){
            SESSION = 1111111;
            response.setHeader('Set-Cookie', `userid=${SESSION}; path=/; httpOnly; expires=2021-04-16;`);//设置客户端cookie
            //userId：用户识别标识（自定义），path=/：表示该cookie在所有路径下均有效，httpOnly：表示限制客户端操作，expire：表示过期时间不设为永久有效
        }else if(!cookie || cookie.split('=')[1] != SESSION){
            response.end(JSON.stringify({
                code:500,
                msg:"您未登录"
            }))
            return
        }
        
        response.writeHead(200,baseconfig.writeHeadsJson);

        if(method == 'GET'){
            let parmurl = new urljs.URL(`${request.headers.referer + url}`);
            parm = querystring.parse(parmurl.search.replace("?",""));
            response.end(JSON.stringify({
                code:200,
                list:list,
                request:parm
            }))
        }else if(method == 'POST'){
            let body = '';
            request.on('data',function(postdata){
                body += postdata;
                console.log(body);
                parm = querystring.parse(body);
                const sql = `SELECT * FROM u_userinfo`;
                connection.query(sql,function(err,data){
                    response.end(JSON.stringify({
                        code:200,
                        data:data,
                        request:parm
                    }))
                })
                
            })
        }
        
    } else if(url){ //静态资源
        fs.readFile(`./web${url}`,function(err,data){
            if(url.lastIndexOf(".css") > -1){//设置css文件传输类型
                response.writeHead(200,baseconfig.writeHeadsCss)
            }
            response.end(data)
        })
    }
})

serve.listen(8080,function(){
    console.log(`请访问:localhost:8080`)
})