$(function(){
    // 获取用户信息
    getUserInfo()

    // 退出
    var layer = layui.layer
    $('#btnLogout').on('click',function(){
        layer.confirm('是否确认退出?', {icon: 3, title:'提示'}, function(index){
            // 1. 清空本地token
            localStorage.removeItem('token')
            // 2. 跳转到登录页
            location.href = '/login.html'
            // 3. 关闭询问框  
            layer.close(index);
          });
    })
})

// 获取用户信息函数
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success:function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layer.msg(res.message)
            }
            // 渲染头像
            renderAvatar(res.data)
        }
    })
}

// 渲染
function renderAvatar(user){
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    if(user.user_pic !== null){
        $('.layui-nav-img').show().attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.text-avatar').show().html(text)
    }
}