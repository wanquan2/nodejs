/*
** XMLHttpRequest对象实现数据请求(简易版)
*/
function ajax(obj){
    let xhr = new XMLHttpRequest();         // XMLHttpRequest用于与后台交换数据，大多数主流浏览器都支持；IE低版本使用activeXObject对象
    //xhr.readyState //readyState 保存XMLHttpRequest的状态0-4,0：初始化 1：服务连接已建立 2：请求已接收 3：请求处理中 4：请求一完成且响应已就绪
    xhr.open(obj.method,obj.url,obj.async); // open和send方法将请求发送到服务器
                                            // open规定请求类型；open(method,url,async) method:请求类型，url:服务器文件地址，async:同步异步
    xhr.setRequestHeader("Accept", "application/json"); //setRequestHeader(key,value)设置请求消息头，必须在oppen之后调用
    xhr.onreadystatechange = function(){ //每当readyState值改变时触发onreadystatechange函数 
        if(xhr.readyState != 4){
            return
        }
        switch(xhr.status){  //status 返回转态码                 
            case 200:
                //responseText：字符串形式相应数据 responseXml：xml形式相应数据
                //getAllResponseHeaders 方法获取响应头信息
                //getResponseHeader 方法获取指定响应头信息 如：getResponseHeader('token')

                //obj.success(xhr.responseText,xhr.getAllResponseHeaders());
                setTimeout(function(){
                    obj.success(xhr.responseText,xhr.getAllResponseHeaders());
                },2000)//延迟2秒 模拟服务器响应时间
            break
            case 404:
                obj.fail('访问接口不存在',xhr.getAllResponseHeaders());
            break
            case 502:
                obj.fail('服务器驾崩了',xhr.getAllResponseHeaders());
            break
        }
    };
    xhr.send(null); // send将请求发送到服务器，post请求传参如：send('name=张三&age=14')
}


// ajax({
//     method:'get',
//     url:'./jsonData.json',
//     async:false,
//     success:function(res,header){
//         //console.log(res);
//     },
//     fail:function(res,header){
//         //console.log(res);
//     }
// })