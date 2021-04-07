let http = require("http")

let serve = http.createServer(function(requset,response){
    response.writeHead(200,{'Content-Type': 'text/plain',})
    response.end('你好')
}).listen(8080)