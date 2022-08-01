/*
** 项目列表
*/

const sqlfn = require('../base/base_sql');
const getrequset = require('../base/base_request');

module.exports = class itemList {
    constructor(request, response) {
        this.req = request;
        this.res = response;
    }

    async ends() {
        this.res.setHeader('Content-Type', 'pplication/json;charset=UTF-8');

        //let list = await sqlfn.executesql(`SELECT * FROM u_item`);//查询
        let list = []
        const sql = await sqlfn.executesql(`select * from u_navigation right join u_item on u_item.id = u_navigation.item_id`);//查询
        if(sql.code == 200 && sql.data){
            sql.data.forEach(item => {
                let child = {}
                let obj = {
                    id: item.id,
                    label_id: item.label_id,
                    name: item.name,
                    start: item.start,
                    user_id: item.user_id,
                    prototypes: item.prototypes,
                    design: item.design,
                    git: item.git,
                    note: item.note,
                    other: item.other,
                    label_name: item.label_name,
                    create_time: item.create_time,
                    user_name: item.user_name,
                    stop: item.stop,
                    label_type: item.label_type,
                    child: []   
                }
                if(item.item_id){
                    child = {
                        navid: item.navid,
                        label: item.label,
                        url: item.url,
                        file: item.file,
                        type: item.type
                    }
                }
                if(list.length){
                    let ischild = false
                    list.forEach(tem => {
                        if(tem.id == item.id){
                            tem.child.push(child)
                            ischild = true
                        }
                    })
                    if(!ischild){
                        if(item.item_id){
                            obj.child.push(child)
                        }
                        list.push(obj)
                    }
                }else{
                    if(item.item_id){
                        obj.child.push(child)
                    }
                    list.push(obj)
                }
            })
        }

        this.res.end(JSON.stringify({
            code: sql.code,
            msg: sql.msg,
            list: list
        }))
    }
}

