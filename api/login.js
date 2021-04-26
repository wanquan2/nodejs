/*
** 登录
*/

const sqlfn = require('../base/base_sql');
const getrequset = require('../base/base_request');

module.exports = class login {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    async ends(){
        this.res.setHeader('Content-Type','pplication/json;charset=UTF-8');
        let parm = await getrequset.post(this.req);//获取接口参数
        let datasql = await sqlfn.executesql(`SELECT * FROM u_userinfo WHERE name="${parm.name}"`);//执行sql语句

        if(!datasql.data.length){
            this.res.end(JSON.stringify({
                code:500,
                msg: `${parm.name}用户不存在`
            }))
            return
        }

        this.res.setHeader('Set-cookie',`userid=111;path=/;httpOnly;exprise=2021-04-25`);//设置cookie
        this.res.end(JSON.stringify({
            code:datasql.code,
            data:datasql.data[0],
            msg: datasql.msg,
            request:parm
        }))
    }
}

