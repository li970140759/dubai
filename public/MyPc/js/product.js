$(function () {
    var currentPage = 1
    var pageSize = 3
    var picArr = []
    render()
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                var htmlStr = template('productTpl', info)
                $('tbody').html(htmlStr)
                console.log(info)
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    // 给页码添加点击事件
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

    $('#addBtn').click(function () {
        $('#addProduct').modal('show')

        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: 1,
                pageSize: 100
            },
            dataType: 'json',
            success: function (info) {
                console.log(info)
                var htmlStr = template('dropdownTpl', info)
                $('.dropdown-menu').html(htmlStr)
            }
        })
    })

    $('.dropdown-menu').on('click', 'a', function () {
        var txt = $(this).text()
        $('#dropdownText').text(txt)
        var id = $(this).data('id')
        $('[name="brandId"]').val(id)
        // $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
        $('#form').data('bootstrapValidator').updateStatus('brandId', 'VALID')
    })

    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            var picObj = data.result
            picArr.unshift(picObj)

            var picUrl = picObj.picAddr

            $('#imgBox').prepend('<img src="' + picUrl + '" style="width: 100px" alt="">')

            if (picArr.length > 3) {
                picArr.pop();
                $('#imgBox img:last-of-type').remove()
            }

            if (picArr.length == 3) {
                $('#form').data('bootstrapValidator').updateStatus('picStatus', 'VALID')

            }
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
    
        // 配置校验规则
        fields: {
          brandId: {
            validators: {
              notEmpty: {
                message: "请选择二级分类"
              }
            }
          },
          proName: {
            validators: {
              notEmpty: {
                message: "请输入商品名称"
              }
            }
          },
          proDesc: {
            validators: {
              notEmpty: {
                message: "请输入商品描述"
              }
            }
          },
          // 商品库存必须是非零开头的数字
          num: {
            validators: {
              notEmpty: {
                message: "请输入商品库存"
              },
              regexp: {
                regexp: /^[1-9]\d*$/,     // 1   11    121
                message: '商品库存必须是非零开头的数字'
              }
            }
          },
    
          // 尺码: 要求必须是 xx-xx 的格式, xx为两位数字
          size: {
            validators: {
              notEmpty: {
                message: "请输入商品尺码"
              },
              // 正则校验
              regexp: {
                regexp: /^\d{2}-\d{2}$/,
                message: '尺码要求必须是 xx-xx 的格式, xx为两位数字'
              }
            }
          },
          oldPrice: {
            validators: {
              notEmpty: {
                message: "请输入商品原价"
              }
            }
          },
          price: {
            validators: {
              notEmpty: {
                message: "请输入商品现价"
              }
            }
          },
    
          // 标记图片是否上传满 3 张
          picStatus: {
            validators: {
              notEmpty: {
                message: "请上传 3 张图片"
              }
            }
          }
        }
      });

      $('#form').on('success.form.bv',function(e){
        console.log(1)
          e.preventDefault()
            // 获取所有表单数据
          var paramsStr = $('#form').serialize()
          paramsStr += "&picArr=" + JSON.stringify(picArr);

          $.ajax({
              type:'post',
              url:'/product/addProduct',
              data:paramsStr,
              dataType:'json',
              success:function(info){
                  if(info.success){
                      $('#addproduct').modal('hide')
                      currentPage = 1
                      render()
                      
                      $('#form').data('bootstrapValidator').resetForm(true)
                      $('#dropdownText').text('请选择二级分类')
                      $('#imgBox img').remove();
                      picArr = [];
                  }
              }
          })
      })
})

