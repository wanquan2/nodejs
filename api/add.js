/*
** 添加
*/

const querystring = require("querystring");
const connection = require('../base/connect_database');

module.exports = class add {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    ends(){
        let parm = {};
        this.req.on('data',(postdata) => {
            parm = querystring.parse(postdata.toString());
            let sql = `INSERT INTO u_userinfo(name) VALUES("${parm.name}")`;
            connection.query(sql,(err,data) => {
                let isErr = false;
                if(err){
                    isErr = true;
                }
                this.res.setHeader('Content-Type','pplication/json;charset=UTF-8');
                this.res.end(JSON.stringify({
                    code:isErr ? 500 : 200,
                    msg:isErr ? '失败' : '成功',
                    request:parm
                }))
            })
        })
    }
}

