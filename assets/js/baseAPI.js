var baseURL = 'http://api-breakingnews-web.itheima.net'

$.ajaxPrefilter(function(options){
    // 添加根路径
    options.url = baseURL + options.url


    // 身份验证
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 拦截所有响应，判断身份认证信息
    options.complete = function(res){
        // console.log(res.responseJSON);
        var obj = res.responseJSON
        if(obj.status == 1 && obj.message == '身份认证失败！'){
             // 1. 清空本地token
             localStorage.removeItem('token')
             // 2. 跳转到登录页
             location.href = '/login.html'
        }
    }
})