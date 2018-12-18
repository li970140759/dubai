$(function () {
    var currentPage = 1; // 当前页
    var pageSize = 5; // 每页多少条

    render();

    function render() {
        $.ajax({
            type: "get",
            url: "/category/querySecondCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info)
                var htmlStr = template("secondTpl", info);
                $('tbody').html(htmlStr);

                // 进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size), // 总页数
                    // 添加点击事件
                    onPageClicked: function (a, b, c, page) {
                        // 更新当前页
                        currentPage = page;
                        // 重新渲染
                        render();
                    }
                })
            }
        })
    }

    $('#addBtn').click(function(){
        $('#addModal').modal('show')
        //显示的同时发送ajax，渲染下拉列表 提高用户体验
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            dataType:'json',
            data:{
                page:1,
                pageSize:100
            },
            success:function( info ){
                console.log(info)
                var htmlStr = template('dropdownTpl',info)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click','a',function(){
        var txt = $(this).text()
        $('#dropdownText').text(txt)

        var id = $(this).data('id')
        $('[name = "categoryId"]').val(id)
        $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')
    })

    $('#fileupload').fileupload({
        dataType:'json',
        done:function(e, data){
            var result = data.result
            var picUrl = result.picAddr

            $('#imgBox img').attr('src',picUrl)

            $('[name = "brandLogo"]').val(picUrl)
            $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID')

        }
    })

    $('#form').bootstrapValidator({
        // 配置排除项, 对隐藏域也进行校验
        excluded: [],
    
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',         // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
        fields: {
          categoryId: {
            validators: {
              notEmpty: {
                message: "请选择一级分类"
              }
            }
          },
          brandName: {
            validators: {
              notEmpty: {
                message: "请输入二级分类名称"
              }
            }
          },
          brandLogo: {
            validators: {
              notEmpty: {
                message: "请选择图片"
              }
            }
          }
        }
    
      });

      $('#form').on('success.form.bv',function(e){
          e.preventDefault()
          $.ajax({
              type:'post',
              url:'/category/addSecondCategory',
              dataType:'json',
              data:$('#form').serialize(),
              success:function(info){
                  if(info.success){
                      $('#addModal').modal('hide')
                      currentPage = 1
                      render()

                      $('#form').data('bootstrapValidator').resetForm(true)

                      $('#dropdownText').text('请选择一级分类')
                      $('#imgBox img ').attr('src','images/none.png')
                  }
              }
          })
      })
})