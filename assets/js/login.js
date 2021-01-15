$(function () {
    // 注册/登录点击切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义验证规则
    var form = layui.form
    form.verify({
        // 密码规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6-12位，且不能输入空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 注册功能
    var layer = layui.layer
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.massage)
                }
                layer.msg('注册成功，去登录')
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    })

    // 登录功能
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg(res.massage)
                }
                layer.msg('恭喜你，登录成功')
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        })
    })
})