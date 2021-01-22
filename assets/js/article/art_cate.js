$(function(){
    // 文章列表显示
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                var str = template('tpl-artcate',res)
                $('tbody').html(str)
            }
        })
    }


    var indexAdd = null;
    // 显示添加分类的表单
    $('#btnAdd').on('click',function(){
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html()
        });   
    })


    // 提交文章分类添加（事件委托）
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtCateList()
                layui.layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null;
    var form = layui.form
     // 显示修改分类的表单
     $('tbody').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html()
        }); 
        
        // 获取修改前的原数据 渲染到表单
        var id = $(this).attr('data-id')
        $.ajax({
            method:'GET',
            url:'/my/article/cates/' + id,
            success:function(res){
                form.val('form-edit', res.data)
            }
        })
    })


    // 修改 
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                initArtCateList()
                layui.layer.close(indexEdit)
            }
        })
    })

    // 删除
    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        layer.confirm('是否确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                data:$(this).serialize(),
                success:function(res){
                    if(res.status !== 0){
                        return layui.layer.msg(res.message)
                    }
                    layui.layer.msg(res.message)
                    initArtCateList()
                    layer.close(index);
                }
            })
            
            
          });
    })
})