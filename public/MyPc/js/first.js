$(function(){

    
  var currentPage = 1; 
  var pageSize = 5;

  render();
  function render() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        var htmlStr = template("firstTpl", info);
        $('tbody').html( htmlStr );


        // 分页
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil( info.total / info.size ),
          // 添加点击事件
          onPageClicked: function( a, b, c, page ) {
            console.log( page );
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
    })

    $('#form').bootstrapValidator({
        // 配置图标
        feedbackIcons: {
          valid: 'glyphicon glyphicon-ok',         // 校验成功
          invalid: 'glyphicon glyphicon-remove',   // 校验失败
          validating: 'glyphicon glyphicon-refresh'  // 校验中
        },
    
        // 校验字段     先给input设置name
        fields: {
          categoryName: {
            // 校验规则
            validators: {
              // 非空
              notEmpty: {
                // 提示信息
                message: "请输入一级分类名称"
              }
            }
          }
        }
    
      });
      $('#form').on('success.form.bv',function(e){
        console.log(1)
          e.preventDefault();
          $.ajax({
              type:'post',
              url:'/category/addTopCategory',
              data:$('#form').serialize(),
              dataType:'json',
              success:function( info ){
                  if( info.success){
                    // console.log(1)
                      $('#addModal').modal('hide')
                      currentPage = 1
                      render()

                      $('#form').data("bootstrapValidator").resetForm(true)
                  }
              }
          })
      })

})