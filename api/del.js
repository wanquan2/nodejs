/*
** 删除
*/

const sqlfn = require('../base/base_sql');
const getrequset = require('../base/base_request');

module.exports = class del {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    async ends(){
        this.res.setHeader('Content-Type','pplication/json;charset=UTF-8');
        let parm = getrequset.get(this.req);
        
        let del = await sqlfn.executesql(`DELETE FROM u_userinfo WHERE id = ${parm.id}`);//删除
        let list = await sqlfn.executesql(`SELECT * FROM u_userinfo`);//查询

        this.res.end(JSON.stringify({
            code:del.code,
            msg: del.msg,
            list:list.data,
            request:parm
        }))
    }
}

