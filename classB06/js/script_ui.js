$(function(){
    //첫 화면 셋팅 버튼
    $(".btn_setting").click(function(){
        $(this).parent()/*.hide()*/.slideUp();
        loadDataFn();
    })

    var loadDataFn;//json 데이터 담는 변수(전역변수 : 전체 구역에 적용되는 변수)

    function loadDataFn(){ //ajax를 통해 json파일을 받아오는 함수

        $.ajax({
            url:"js/data.json",
            dataType:"json",
            success:function(result){ //json 데이터를 받아왔다면 실행이되는 함수 >> success / result는 임의의 값임(success데이터가 담길 값)
                //console.log(result);
                complateData = result.seatInfo;//로드된 데이터 중 씻인포를 컴플리트데이터를 담음. 11행과 같이 변수 선언 필수.
                settingSeatFn();
            }
        })
    }

    //배열에 대한 전역변수를 밖으로 뺌
    var selectArray = [];

    //자리 셋팅 관련 함수
    function settingSeatFn(){
        $(".section.reservation")/*.show()*/.slideDown();

        //목록 누적을 막기위한 목록 지우기(초기화)
        $(".section.reservation > ol > li").remove();

        //선택 값 초기화
        $(".txt_info_number").text("");
        $(".txt_info_total").text(0);


        //파싱작업 (json에서 특정 값만 뽑아냄)
        for(var i=0; i<complateData.length; i++){ //데이터를 순서대로 출력
            var name = complateData[i].name;
            var price = complateData[i].price;
            var reserve = complateData[i].reserve;
            $(".section.reservation > ol").append('<li class="unit"><button data-price="'+price+'" '+reserve+'>'+name+'</button></li>')
        }

        selectArray = [];//선택좌석 index를 담는 배역

        var name;//전역변수
        var price;//전역변수
        //버튼 이벤트
        $(".section.reservation .unit > button").click(function(){
            //alert($(this).text());

            $(this).toggleClass("select");

            if($(this).hasClass("select")){//좌석 선택할 경우. 그 안에 'select'가 있다면이 가정
                selectArray.push($(this).parent().index());
            }else{//좌석 해제될 경우
                
                var removeIndex = selectArray.indexOf($(this).parent().index()); //indexOf로 선택한 값이 위치해있는 순서(index)를 찾음
                selectArray.splice(removeIndex, 1);//배열의 index위치부터 1자리를 삭제함 / Splice는 해당 index를 삭제
            }
            /**var**/ name = ""; //전역변수로 선언하여 var 삭제. 그러나 name/price 값은 초기화
            /**var**/ price = 0;//숫자가 돼야하기 때문에 초기값이 0
            for(var i=0; i<selectArray.length; i++){
                console.log(selectArray[i])//순서대로 index 출력
                name += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").text()+" ";//버튼 열고닫고 사이의 값을 출력 >> text
                price += $(".section.reservation > ol > li").eq(selectArray[i]).find("button").data("price");
            }
            $(".txt_info_number").text(name);
            $(".txt_info_total").text(price);
        });

        //완료 클릭이벤트
        $(".btn_submit").click(function(){
            if(selectArray.length > 0){
                $(".section.reservation")/*.hide*/.slideUp();
                $(".section.complete")/*.show*/.slideDown();
                $(".section.complete .txt_number").text(name);
                $(".section.complete .txt_price > strong").text(price);
                }else{
                    alert("좌석을 선택해 주세요");
                }
        });

        //리셋 이벤트
        $(".section.complete .btn_reset").click(function(){
            $(".box_intro").slideDown();
            $(".section.complete").slideUp();
        })
        
    }
    
})