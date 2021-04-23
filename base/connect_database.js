/*
    ** 数据库连接
*/
const mysql = require('mysql');

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'onlyyou'
})

connection.connect(function(err) {//判断数据库是否连接成功
    if (err) {
        console.error('数据库连接失败: ' + err.code);
        return;
    }
    console.log('数据库连接成功，connected as id ' + connection.threadId);
});

module.exports = connection;

//exports.connection = connection; //注意module.exports抛出对象本身可以直接使用，exports[对象名]=内容对象 抛出的是模块函数