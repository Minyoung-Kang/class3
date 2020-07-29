var isIos = /iPhone|iPad|iPod/i.text(navigator.userAgent) ? true : false;

$(function(){
    $(".txt_area input").keypress(function(e){
        if(e.keyCode == 13 && $(this).val().length > 0){//엔터를 누를 경우 & 입력하고 있는 input의 값이 있을 때 실행
            console.log($(this).attr("class"));
            //if($(this).hasClass("mymsg")){//mymsg라를 클래스가 있을 경우 실행
            var _val = $(this) .val();
            var _class = $(this).attr("class");
            var _time =currentTimeFn();

            $(this).val("");//입력된 value 삭제
            $(".chat_wrap .inner").append('<div class="item '+_class+'"><div class="box"><p class="msg">'+_val+'</p><span class="time">'+_time+'</span></div></div>')
            setTimeout(function(){//애니메이션 클래스는 사간차를 줘야 작동함
                $(".chat_wrap .inner .item").last().addClass("on");
                var _h = $(".chat_wrap .inner .item").height();//item의 높이값
                var _l = $(".chat_wrap .inner .item").length;//item의 갯수
                var _mt = $(".chat_wrap .inner .item").last().css("margin-top");//item의 margin-top 값
                _mt = parseInt(_mt, 10);//margin-top의 값 중 px(단위)를 삭제
                //$(".chat_wrap .inner").scrollTop(_h*_l + _mt*(_l));//위의 알아낸 값들의 계산식을 scrollTop에 적용    
                $(".chat_wrap .inner").stop().animate({
                    scrollTop:_h*_l + _mt*(_l-1)
                },500)
            },100);
    
        }
    })
});

//아이폰 처리
if(isIos){
    $(".txt_area input").focusin(function(){
        setTimeout(function(){
            $(".chat_wrap").addClass("keypad_on");
            $("html").stop().animate({
                scrollTop:0
            },10)
        },30)
    })
    $(".txt_area input").focusout(function(){
        $(".chat_wrap").removeClass("keypad_on");
    })
}


//현재시간을 알아내고 값을 반환하는 함수(function)
function currentTimeFn(){
    var _date = new Date();//현재 시간에 대한 정보가 담겨있는 함수
    var _hh = _date.getHours();//현재 시
    var _mm = _date.getMinutes();//현재 분
    var _apm;
    if(_hh > 12){
        //오후정보를 담는 변수
        _apm = "오후";
        _hh = _hh - 12;
    }else{
        _apm = "오전"
    }
    if(_hh < 10) _hh="0"+_hh;//True 케이스만 있을 경우 중괄호 생략 가능
    if(_mm < 10) _mm="0"+_mm;

    var _ct = _apm +" "+_hh+":"+_mm;
    return _ct;//_ct 값을 반환
}