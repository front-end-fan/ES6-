function myAjax(options){
    // 处理参数
    let {url, data, type = "get", async = true, dataType = "json", success, error} = options || {};
    let arr = [];
    for(let key in data){
        arr.push(`${key}=${data[key]}`);
    }
    let paramStr = arr.join("&");

    // 1.创建
    let xhr;
    try{
        xhr = new XMLHttpRequest();
    }catch(error){
        xhr = new ActiveXObject('Microsoft.XHMHTTP');
    }

    // 设置返回的数据类型
    xhr.responseType = dataType; 

    // 2.连接、发送
    if(type.toLowerCase() == 'get'){
        xhr.open('GET', `${url}?${paramStr}`, true);
        xhr.send(); 
    }else{
        xhr.open('POST', url, true);
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(paramStr);
    }

    // 3. 接收
    xhr.onreadystatechange = () => {
        if(xhr.readyState === 4){
            if(xhr.status > 200 && xhr.status < 300 || xhr.status < 301){
                success(xhr.responseText);
            }else{
                error(xhr.status)
            }
        }
    };
}