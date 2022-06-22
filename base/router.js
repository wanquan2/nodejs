/*
** 路由管理
*/
const notpath = require('../api/notpath')
const static = require('../api/static');
const login = require('../api/login');
const add = require('../api/add');
const del = require('../api/del');
const userlist = require('../api/userList');
const labelList = require('../api/labelList');
const applyItem = require('../api/applyItem');
const itemList = require('../api/itemList');
const upload = require('../api/upload');
const applyNavigation = require('../api/applyNavigation');

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
            case '/api/userlist':
                let userlistAction = new userlist(request,response);
                userlistAction.ends();
                break;
            case '/api/labellist':
                let labellistAction = new labelList(request,response);
                labellistAction.ends();
                break;
            case '/api/applyitem':
                let applyitemAction = new applyItem(request,response);
                applyitemAction.ends();
                break;
            case '/api/itemlist':
                let itemlistAction = new itemList(request,response);
                itemlistAction.ends();
                break;
            case '/api/upload':
                let uploadAction = new upload(request,response);
                uploadAction.ends();
                break;
            case '/api/applynavigation':
                let applynavigationAction = new applyNavigation(request,response);
                applynavigationAction.ends();
                break;
            default://接口不存在
                notpath(request,response);
                break;
        }
        
    }else{//静态文件
        const staticAction = new static(request,response);
        staticAction.render()
    }
}

module.exports = router




