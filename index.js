const http = require("http");
const fs = require("fs");
const urljs = require("url");
const util = require('util');

const writeHeads = {
    'Content-Type': 'text/html;charset=utf-8',
    'token':'wwwwwww-11111'
}
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
            response.writeHead(200,writeHeads)
            response.end(html)
        })
    } else if(url.indexOf('/api/') > -1){//接口前缀
        const parm = util.inspect(urljs.parse(url, true)).Url;
        console.log(request);
        console.log('----------------------------------------------------------');
        console.log(parm);
        // console.log(parm.query);
        // console.log(parm.pathname);

        response.writeHead(200,{'Content-Type':'pplication/json;charset=UTF-8'})
        response.end(JSON.stringify({
            code:200,
            list:list
        }))
    } else if(url){ //静态资源
        fs.readFile(`./web${url}`,function(err,data){
            response.end(data)
        })
    }
})

serve.listen(8080,function(){
    console.log(`请访问:localhost:8080`)
})