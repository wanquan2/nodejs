let http = require("http")
let fs = require("fs")

let serve = http.createServer();

serve.on("request",function(request,response){
    let url = request.url;
    if(url == '/' || url.lastIndexOf(".html") > -1){//html页面
        url = url == '/' ? '/index.html' : url;
        fs.readFile(`./web${url}`,function(err,data){
            response.writeHead(200,{'Content-Type': 'text/html','token':'wwwwwww-11111'})
            response.end(data)
        })
    } else if(url){ //静态资源
        fs.readFile(`./web${url}`,function(err,data){
            response.end(data)
        })
    }
})

serve.listen(8080,function(){
    console.log(`请访问localhost:8080`)
})