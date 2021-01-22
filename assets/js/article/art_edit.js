$(function () {

    var form = layui.form

    // 设置表单信息
    function initForm() {
        var id = location.search.split('=')[1]
        $.ajax({
            method: 'GET',
            url: '/my/article/' + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                form.val('form-edit', res.data)
                tinyMCE.activeEditor.setContent(res.data.content)
                if (!res.data.cover_img) {
                    return layui.layer.msg("用户未曾上传封面")
                }
                var newImgURL = baseURL + res.data.cover_img
                $image
                    .cropper('destroy')      // 销毁旧的裁剪区域
                    .attr('src', newImgURL)  // 重新设置图片路径
                    .cropper(options)        // 重新初始化裁剪区域
            }
        })
    }





    // 1. 初始化分类

    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                var str = template('tpl-cate', res)
                $('[name=cate_id]').html(str)
                form.render()
                // 渲染修改表单
                initForm()
            }
        })
    }


    // 2. 初始化富文本编辑器
    initEditor()

    // 3. 封面裁剪
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 4. 选择图片
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click()
    })

    // 5. 设置图片
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0]
        if (file === undefined) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 6.设置状态
    var state = '已发布'
    $('#btnSave2').on('click', function () {
        state = '草稿'
    })

    // 7. 添加文章
    $('#form-edit').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData(this)
        fd.append('state', state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                publishArticle(fd)

            })
    })

    // 添加文章的函数
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/edit',
            data: fd,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                setTimeout(function () {
                    window.parent.document.getElementById('art_list').click()
                }, 1500)
            }
        })
    }

})