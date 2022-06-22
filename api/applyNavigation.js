/*
** 添加项目添加子类
*/

const sqlfn = require('../base/base_sql');
const getrequset = require('../base/base_request');

module.exports = class applyNavigation {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    async ends(){
        let create_time = ''
        let type_name = ''

        this.res.setHeader('Content-Type','pplication/json;charset=UTF-8');
        let parm = await getrequset.post(this.req);
        let isexist = await sqlfn.executesql(`SELECT * FROM u_navigation WHERE name="${parm.label}"`);//查询是否已存在

        if(isexist.data && isexist.data.length && isexist.data[0].type == parm.type){
            this.res.end(JSON.stringify({
                code:500,
                msg: `${isexist.data[0].label}已经存在，请勿重复添加`
            }))
            return
        }
        
        create_time = new Date().getTime()
        if(parm.type == 0){
            type_name = '开发环境'
        }else if(parm.type == 1){
            type_name = '测试环境'
        }else{
            type_name = '正式环境' 
        }

        let vulue = `"${parm.label}","${parm.url}","${parm.file}","${parm.type}","${parm.item_id}","${parm.note}","${type_name}","${create_time}"`
        let sql = `INSERT INTO u_navigation(label,url,file,type,item_id,note,type_name,create_time) VALUES(${vulue})`;
        let adddata = await sqlfn.executesql(sql);//添加

        this.res.end(JSON.stringify({
            code:adddata.code,
            msg: adddata.msg
        }))
    }
}

