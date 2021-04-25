/*
** 执行sql
*/

const connection = require('../base/connect_database');

const basesql = {
    executesql:function(sql){
        return new Promise(function(resolved,rejected){
            connection.query(sql,function(err,data){//执行sql
                let obj = {
                    code:200,
                    msg:'成功',
                    data:data || []
                };
                if(err || !data){
                    obj.code = 500
                    obj.msg = `失败：${err.sqlMessage}`
                }
                resolved(obj)
            })
        })
    }
}

module.exports = basesql;