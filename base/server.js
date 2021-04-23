/*
** 服务连接
*/
const http = require('http');
const router = require('./router');

class start {
    constructor(port){
        this.port = port;
    }

    requestFn(request,response){
        router(request,response)
    }

    server(){
        http.createServer(this.requestFn).listen(this.port,err => {
            console.log(`请访问：http://localhost:${this.port}`)
        })
    }
}

module.exports = start
