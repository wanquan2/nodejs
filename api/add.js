/*
** 添加
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
        let parm = await getrequset.post(this.req);
        let isexist = await sqlfn.executesql(`SELECT * FROM u_userinfo WHERE name="${parm.name}"`);//查询是否已存在

        if(isexist.data && isexist.data.length){
            this.res.end(JSON.stringify({
                code:500,
                msg: `${isexist.data[0].name}已经存在，请勿重复添加`
            }))
            return
        }
        let sql = `INSERT INTO u_userinfo(username,name,sex,job,age) VALUES("${parm.username}","${parm.name}",${parm.sex*1},"${parm.job}",${parm.age*1})`;
        let adddata = await sqlfn.executesql(sql);//添加
        let list = await sqlfn.executesql(`SELECT * FROM u_userinfo`);//查询

        this.res.end(JSON.stringify({
            code:adddata.code,
            msg: adddata.msg,
            list:list.data,
            request:parm
        }))
    }
}

