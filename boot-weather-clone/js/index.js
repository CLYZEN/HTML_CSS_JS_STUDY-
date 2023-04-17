;(function () {
  // 접속자의 위치정보 가져오기

  // 현재 위치 가져오기
  // navigator.geolocation.getCurrentPosition(동의 하였을 때의 함수, 동의하지 않았을 때 함수)
  navigator.geolocation.getCurrentPosition(getSuccess, getError)

  var cityList = [
    "seoul",
    "incheon",
    "busan",
    "daegu",
    "daejeon",
    "jeju",
    "gangneung",
    "bucheon",
    "gimhae",
    "gyeongju",
    "iksan",
    "yeosu",
  ]
  for (const city of cityList) {
    // 각 도시의 날씨를 구함.
    let temp = getWeatherWithCity(city)
    // console.log(city, temp)
    // $(.city > .celsius").text(`${temp.celsuis}℃`)
    $("." + city + " > .celsius").text(`${temp.celsuis}℃`)
    var iconURL = "https://openweathermap.org/img/wn/" + temp.icon + ".png"
    // $(.city > .icon > img").attr("src", iconURL)
    $("." + city + "> .icon > img").attr("src", iconURL)
  }
  // 가져오기 성공
  function getSuccess(position) {
    // position: 사용자 위치정보
    const lat = position.coords.latitude // 위도
    const lon = position.coords.longitude // 경도

    loadMap(lat, lon)
  }
  // 가져오기 실패
  function getError() {
    console.error("사용자의 위치정보를 가져오는데 실패하였습니다.")
  }

  // 카카오맵 실행해 주는 함수
  function loadMap(lat, lon) {
    // Kakao Map
    var mapContainer = document.getElementById("map"), // 지도를 표시할 div
      mapOption = {
        center: new kakao.maps.LatLng(lat, lon), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }

    // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
    var map = new kakao.maps.Map(mapContainer, mapOption)

    // 마커가 표시될 위치입니다
    var markerPosition = new kakao.maps.LatLng(lat, lon)

    // 마커를 생성합니다
    var marker = new kakao.maps.Marker({
      position: markerPosition,
    })

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map)

    // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
    // marker.setMap(null);

    // 좌표(위경도) => 주소 변환

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder()

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo)

    // coords : 접속한 중심좌표의 위경도 정보가 있음
    // callback : displayCenterInfo(result, status) 함수가 있음

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback)
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        // var infoDiv = document.getElementById("centerAddr")

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            let juso = result[i]
            console.log(juso.region_1depth_name)
            console.log(juso.region_3depth_name)

            $(".region1-depth").text(juso.region_1depth_name)
            $(".region-3-depth").text(juso.region_3depth_name)

            // 온도 구하기
            let temp = getWeather(lat, lon)
            $(".region-weather").text(`${temp.celsuis}℃`)

            // 아이콘 바꾸기
            var iconURL =
              "https://openweathermap.org/img/wn/" + temp.icon + ".png"

            $(".region-icon").attr("src", iconURL)
            // infoDiv.innerHTML = result[i].address_name
            break
          }
        }
      }
    }
  }

  // OpenWeather 현재온도 가져오기

  function getWeather(lat, lon) {
    var urlAPI =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=10c9d93b5bb786ac2df8e5429b6b3390&lang=kr"
    urlAPI += "&lat=" + lat
    urlAPI += "&lon=" + lon

    var temp = {}
    $.ajax({
      type: "GET",
      url: urlAPI,
      dataType: "json",
      async: false,
      success: function (data) {
        const celsuis = data.main.temp
        const icon = data.weather[0].icon

        temp.celsuis = celsuis.toFixed(0)
        temp.icon = icon

        // $(".region-weather").text(`${celsuis.toFixed(0)}℃`)
      },
      error: function (request, status, error) {
        console.log("code:" + request.status)
        console.log("message:" + request.responseText)
        console.log("error:" + error)
      },
    })
    return temp
  }

  // 각 도시의 날씨 구하기
  function getWeatherWithCity(city) {
    var temp = {}
    var urlAPI =
      "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=10c9d93b5bb786ac2df8e5429b6b3390&lang=kr&q=" +
      city

    $.ajax({
      type: "GET",
      url: urlAPI,
      dataType: "json",
      async: false,
      success: function (data) {
        const celsuis = data.main.temp
        const icon = data.weather[0].icon

        temp.celsuis = celsuis.toFixed(0)
        temp.icon = icon

        // $(".region-weather").text(`${celsuis.toFixed(0)}℃`)
      },
      error: function (request, status, error) {
        console.log("code:" + request.status)
        console.log("message:" + request.responseText)
        console.log("error:" + error)
      },
    })
    return temp
  }
})()
