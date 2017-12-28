$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration: 0.001, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
    categoryLeftClick();
    getCategoryLeftData();
    
});
function getCategoryLeftData(){
    $.ajax({
        url:'/category/queryTopCategory',
        success:function(data){
            // console.log(data)
            $('.category-left ul').html(template('categoryLeftTmp',data));
            $('.category-left ul li:eq(0)').addClass('active');
        }
    })
}
function categoryLeftClick(){
    $('.category-left ul').on('click','ul li a',function(e){
        // console.log(123);
        $('.category-left ul li').removeClass('active');
        $(this).parent().addClass('active');
        var id=$(e.target).data('id');
        getCategoryRightData(id);
    })
}
function getCategoryRightData(id){
    $.ajax({
        url:'/category/querySecondCategory',
        data:{'id':id},
        success:function(data){
            console.log(data);
            if(data.rows.length) {
                $('.category-right .mui-scroll').html(template('categoryRightTmp', data));
            }else{
                $('.category-right .mui-scroll').html('<p>没有数据</p>')
            }
        }
    })
}