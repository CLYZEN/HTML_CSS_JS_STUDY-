;(function () {
  // 접속자의 위치정보 가져오기

  // 현재 위치 가져오기
  // navigator.geolocation.getCurrentPosition(동의 하였을 때의 함수, 동의하지 않았을 때 함수)
  navigator.geolocation.getCurrentPosition(getSuccess, getError)
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
  }
})()
