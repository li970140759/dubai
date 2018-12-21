$(function () {
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function (info) {
            console.log(info)
            var htmlStr = template('categoryTpl', info)
            $('.category_left ul').html(htmlStr)
            render(info.rows[0].id)
        }
    })

    $('.category_left ul').on('click', 'a', function () {
        $('.category_left ul a').removeClass('current')
        $(this).addClass('current')
        var id = $(this).data('id')
        render(id)
    })

    function render(id){
        $.ajax({
            type: 'get',
            url: "/category/querySecondCategory",
            data: {
                id: id
            },
            dataType:'json',
            success:function(info){
                console.log(info)
                var htmlStr = template('categoryTpl_right',info)
                $('.category_right ul').html(htmlStr)
            }
        })
    }
})