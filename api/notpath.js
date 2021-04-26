/*
** 接口不存在
*/
function notpath(request,response){
    response.writeHead(404,'')
    response.end('not Found')
}

module.exports = notpath