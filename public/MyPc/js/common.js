
// 1. 模拟网络状况条


    // 开启进度条
    $(document).ajaxStart(function(){
        NProgress.start();
    });
    // 关闭进度条
    $(document).ajaxStop(function(){
        setTimeout(function(){
            NProgress.done()
        },500)
    });



$(function(){
    $('.lt_aside .category').click(function(){
        $('.lt_aside .child').stop().slideToggle();
    })

    $('.icon_left').click(function(){
        $('.lt_aside').toggleClass('hidemenu')
        $('.lt_main').toggleClass('hidemenu')
        $('.lt_topbar').toggleClass('hidemenu')
    })

    $('.icon_right').click(function(){
        // console.log(1)
        $('#myModal').modal('show')
    })

    $('#logoutBtn').click(function(){
        console.log(1)
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                console.log(info)
                if(info.success){
                    location.href= 'login.html'
                }
            }
        })
    })
})