(function (){

    /* 접속자 위치정보 가져오기 */

    // 현재 위치 가져오기
    navigator.geolocation.getCurrentPosition(getSuccess, getError);

    // 가져오기 성공
    function getSuccess(position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        console.log(lat, lon);
        loadMap(lat, lon);

    }

    // 가져오기 실패(거부)
    function getError() {
        console.error('Geolocation Error');
    }


    function loadMap(lat, lon) {
        /* 1. 카카오맵 실행 */

        var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
        mapOption = { 
            center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
            level: 3 // 지도의 확대 레벨
        };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        var map = new kakao.maps.Map(mapContainer, mapOption); 




        /* 2. 마커 표시 */

        // 마커가 표시될 위치입니다 
        var markerPosition  = new kakao.maps.LatLng(lat, lon); 

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            position: markerPosition
        });

        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);


        /* 3. 좌표 -> 주소 변환 */

        // 주소-좌표 변환 객체를 생성합니다
        var geocoder = new kakao.maps.services.Geocoder();


        // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);


        function searchAddrFromCoords(coords, callback) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }


        // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
        function displayCenterInfo(result, status) {
            if (status === kakao.maps.services.Status.OK) {

                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        let juso = result[i];
                        console.log(juso);
                        $('.region1-depth').text(juso.region_1depth_name);
                        $('.region3-depth').text(juso.region_3depth_name);

                        let temp = getWeather(lat, lon);
                        $('.region-weather').text(`${temp.celsius}℃`);

                        var iconURL = "https://openweathermap.org/img/wn/";
                        $('.region-icon').attr("src", iconURL + temp.icon + ".png");

                        break;
                    }
                }
            }    
        }
    }

    

    function getWeather(lat, lon) {
        var temp = {};
        var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?appid=f98e648c60dee9415bd3b65e176b86ca&units=metric&lang=kr&lat=37.4495733&lon=126.7154219"; // city가 계속 붙으므로 url 초기화를 위해 반드시 넣어준다
    
        $.ajax({
            type: "GET",
            url: openWeatherAPI,
            dataType: "json",
            async: false, // 결과 데이터를 리턴시키기 위해 동기 방식으로 변경
            success: function(data) {
                //정상 응답시 처리 작업 
                temp.celsius  = (data.main.temp).toFixed(0); // 소수점 버림;
                temp.icon = data.weather[0].icon; 
            },
            error: function(request, status, error) {
                //응답 에러시 처리 작업    
                console.log("code:" + request.status);
                console.log("message:" + request.responseText);
                console.log("error:" + error);
            }
        });
    
        console.log(temp);
        return temp;
    }


    function getWeatherWithCity(city) {
        var temp = {};
        var openWeatherAPI = "https://api.openweathermap.org/data/2.5/weather?appid=f98e648c60dee9415bd3b65e176b86ca&units=metric&lang=kr&q="; // city가 계속 붙으므로 url 초기화를 위해 반드시 넣어준다
        openWeatherAPI += city;

        $.ajax({
            type: "GET",
            url: openWeatherAPI,
            dataType: "json",
            async: false, // 결과 데이터를 리턴시키기 위해 동기 방식으로 변경
            success: function(data) {
                //정상 응답시 처리 작업 
                temp.celsius  = (data.main.temp).toFixed(0); // 소수점 버림;
                temp.icon = data.weather[0].icon; 
            },
            error: function(request, status, error) {
                //응답 에러시 처리 작업    
                console.log("code:" + request.status);
                console.log("message:" + request.responseText);
                console.log("error:" + error);
            }
        });
    
        console.log(temp);
        return temp;
    }


    var cityList = ["seoul", "incheon", "busan", "daegu", "daejeon", "jeju", "gangneung", "bucheon", "gimhae", "gyeongju", "iksan", "yeosu"];

    for(const city of cityList) {
        let temp = getWeatherWithCity(city);
        $('.' + city + ' > .celsius').text(`${temp.celsius}℃`);

        var iconURL = "https://openweathermap.org/img/wn/";
         $('.' + city + ' > .icon > img').attr("src", iconURL + temp.icon + ".png");
    }
})(); 