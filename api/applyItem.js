/*
** 添加项目
*/

const sqlfn = require('../base/base_sql');
const getrequset = require('../base/base_request');

module.exports = class applyItem {
    constructor(request,response){
        this.req = request;
        this.res = response;
    }

    async ends(){
        let label_name = ''
        let label_type = ''
        let user_name = ''
        let create_time = ''

        this.res.setHeader('Content-Type','pplication/json;charset=UTF-8');
        let parm = await getrequset.post(this.req);
        let isexist = await sqlfn.executesql(`SELECT * FROM u_item WHERE name="${parm.name}"`);//查询是否已存在

        if(isexist.data && isexist.data.length){
            this.res.end(JSON.stringify({
                code:500,
                msg: `${isexist.data[0].name}已经存在，请勿重复添加`
            }))
            return
        }
        if(parm.label_id){
            let label = await sqlfn.executesql(`SELECT * FROM u_label WHERE id="${parm.label_id}"`);//查询类型
            label_name = label.data[0].name
            label_type = label.data[0].type
        }
        if(parm.user_id){
            let user = await sqlfn.executesql(`SELECT * FROM u_userinfo WHERE id in (${parm.user_id})`);//查询成员
            user.data.forEach(item => {
                if(!user_name){
                    user_name = item.name
                }else{
                    user_name += `,${item.name}`
                }
            });
        }
        create_time = new Date().getTime()

        let vulue = `${parm.label_id*1},"${parm.name}","${parm.start}","${parm.user_id}","${parm.prototypes}","${parm.git}","${parm.note}","${label_name}","${create_time}","${user_name}",1,"${label_type}"`
        let sql = `INSERT INTO u_item(label_id,name,start,user_id,prototypes,git,note,label_name,create_time,user_name,stop,label_type) VALUES(${vulue})`;
        let adddata = await sqlfn.executesql(sql);//添加

        this.res.end(JSON.stringify({
            code:adddata.code,
            msg: adddata.msg
        }))
    }
}

