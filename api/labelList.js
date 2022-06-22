/*
** 项目类型列表
*/

const sqlfn = require('../base/base_sql');
const getrequset = require('../base/base_request');

module.exports = class labelList {
    constructor(request, response) {
        this.req = request;
        this.res = response;
    }

    async ends() {
        this.res.setHeader('Content-Type', 'pplication/json;charset=UTF-8');

        let list = await sqlfn.executesql(`SELECT * FROM u_label`);//查询

        this.res.end(JSON.stringify({
            code: list.code,
            msg: list.msg,
            list: list.data
        }))
    }
}

