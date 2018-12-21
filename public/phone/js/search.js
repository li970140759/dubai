$(function () {

    render()
    function getHistory() {
        var jsonStr = localStorage.getItem('search_list') || '[]'
        var arr = JSON.parse(jsonStr)
        return arr;
    }
    function render() {
        var arr = getHistory()
        var htmlStr = template('searchTpl', { arr: arr })
        $('.lt_history').html(htmlStr)
    }

    $('.lt_history').on('click', '.btn_empty', function () {
        mui.confirm('确定要清空历史记录么？', '谨慎操作', ['取消', '确认'], function (e) {
            if(e.index === 1){
                localStorage.removeItem('search_list')
                render()
            }
        })
    })

    $('.lt_history').on('click', '.btn_del', function () {
        var that = this
        mui.confirm('确定要删除这条记录么？', '谨慎操作', ['取消', '确认'], function (e) {
            if(e.index === 1){
                var idnex = $(that).data('index')
                var arr = getHistory()
                arr.splice(idnex,1)
                localStorage.setItem('search_list',JSON.stringify(arr))
                render()
            }
        })
    })
    $('.search_btn').click(function(){
        console.log($('.search_input').val())
        var key = $('.search_input').val().trim()
        if(key ===''){
            mui.toast('请输入关键字')
            return;
        }
        var arr = getHistory()
        var index = arr.indexOf(key)
        if(index !== -1){
            arr.splice(index,1)
        }
        if(arr.length >= 10){
            arr.pop()
        }
        arr.unshift(key)
        localStorage.setItem('search_list',JSON.stringify(arr))
        render()
        $('.search_input').val('')
    })
})