/*
** 上传图片
*/

const fs = require('fs');
const formidable = require('formidable');

const staticPath = 'd:/studyDay/nodejs' //静态资源存放路径

module.exports = class upload {
    constructor(request, response) {
        this.req = request;
        this.res = response;
    }
    async ends() {
        this.res.setHeader('Access-Control-Allow-Origin', '*')
        this.res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
        this.res.setHeader('Content-Type', 'application/json')

        let formIdable = new formidable.IncomingForm()
        formIdable.encoding = 'utf-8'
        formIdable.uploadDir = `${staticPath}/web/images/upload`
        formIdable.keepExtensions = true

        formIdable.parse(this.req, (err, fields, files) => {
            const filetype = ['png', 'jpg', 'jpeg'] //允许上传类型

            const filename = files.field.originalFilename //文件名
            const newname = files.field.newFilename
            const nameArray = filename.split('.')
            const type = nameArray[nameArray.length - 1] //文件类型

            if (filetype.indexOf(type) === -1) {
                this.res.end(JSON.stringify({
                    code: 0,
                    msg: `上传失败，只允许${filetype.toString()}格式图片`
                }))
                return
            }

            const date = new Date();
            const time = `_${date.getFullYear()}_${date.getMonth() + 1}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`

            const oldPath = `${formIdable.uploadDir}/invalid-name`
            const newPath = `${formIdable.uploadDir}/${time}_${newname}.${type}`

            fs.renameSync(oldPath, newPath);  //重命名

            this.res.end(JSON.stringify({
                code: 200,
                data: {
                    ...files,
                    src: `upload/${time}_${newname}.${type}`
                },
                msg: `上传成功`
            }))
        })


    }
}

