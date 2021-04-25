/*
** 路由管理
*/
const static = require('../api/static');
const login = require('../api/login');
const add = require('../api/add');
const del = require('../api/del');

function router(request,response){
    let url = request.url;
    if(url.indexOf('/api') > -1){//接口请求
        if(request.method == 'GET'){
            url = url.split('?')[0];
        }
        switch (url) {
            case '/api/login':
                let loginAction = new login(request,response);
                loginAction.ends();
                break;
            case '/api/add':
                let addAction = new add(request,response);
                addAction.ends();
                break;
            case '/api/del':
                let delAction = new del(request,response);
                delAction.ends();
                break;
            default:
                break;
        }
        
    }else{//静态文件
        const staticAction = new static(request,response);
        staticAction.render()
    }
}

module.exports = router




