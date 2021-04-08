let http = require("http")
let fs = require("fs")

let serve = http.createServer();

serve.on("request",function(request,response){
    let url = request.url;
    console.log(url);
    fs.readFile("./web/index.html",function(err,data){
        response.writeHead(200,{'Content-Type': 'text/html','token':'wwwwwww-11111'})
        response.end(data)
    })
})

serve.listen(8080,function(){
    console.log(`请访问localhost:8080`)
})