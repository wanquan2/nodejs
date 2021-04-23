/*
** 登录
*/

const querystring = require("querystring");
const connection = require('../base/connect_database');

module.exports = class login {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    getreqdata(){
        this.req.on('data',(postdata) => {
            parm = querystring.parse(postdata.toString());
        })
    }

    ends(){
        let parm = {};
        this.req.on('data',(postdata) => {
            parm = querystring.parse(postdata.toString());
            let sql = `SELECT * FROM u_userinfo WHERE name="${parm.name}"`;
            connection.query(sql,(err,data) => {
                let isErr = false;
                if(err || !data.length){
                    isErr = true;
                }
                this.res.setHeader('Set-cookie',`userid=111;path=/;httpOnly;exprise=2021-04-25`);
                this.res.setHeader('Content-Type','pplication/json;charset=UTF-8');
                this.res.end(JSON.stringify({
                    code:isErr ? 500 : 200,
                    data:isErr ? undefined : data[0],
                    msg:isErr ? '失败' : '成功',
                    request:parm
                }))
            })
        })
    }
}

