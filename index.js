/*
** 服务启动
*/
const server = require('./base/server')

const action = new server(8080);

action.server()