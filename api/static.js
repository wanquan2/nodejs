/*
** 静态资源
*/

const fs = require('fs');
const {writeHeadsHtml} = require('../base/base_config');

const staticPath = 'd:/studyDay/nodejs' //静态资源存放路径

class staticAction  {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    endshtml(requrl){
        requrl = requrl == '/' ? '/index.html' : requrl;
        fs.readFile(`${staticPath}/web${requrl}`,(err,data) => {
            if(err && err.code == 'ENOENT'){
                this.end404()
                return
            }
            let html = data.toString().replace("{VERSION}","v1.0.0");
            this.res.writeHead(200,writeHeadsHtml)
            this.res.end(html)
        })
    }

    endstatic(requrl){
        if(requrl.lastIndexOf('.css') > -1){
            this.res.setHeader('Content-Type', 'text/css;charset=UTF-8');
        }
        fs.readFile(`${staticPath}/web${requrl}`,(err,data) => {
            this.res.end(data)
        })
    }

    end404(){
        fs.readFile(`${staticPath}/web/404.html`,(err,data) => {
            this.res.end(data)
        })
    }

    render(){
        let requrl = this.req.url;
        if(requrl == '/' || requrl.lastIndexOf(".html") > -1){//html页面
            this.endshtml(requrl);
        }else{
            this.endstatic(requrl);
        } 
    }
}

module.exports = staticAction