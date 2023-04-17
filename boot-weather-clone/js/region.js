// 1. 전체 url 가져오기
const currentURL = location.href

// 2. 쿼리스트링 파라메터 가져오기
const urlObj = new URL(currentURL)
const params = urlObj.searchParams
const q = params.get("q")
const krcity = params.get("krcity")
console.log(q, krcity)
let nowDate = new Date()
let hours = nowDate.getHours()
let min = nowDate.getMinutes()

// 3. ajax 이용해 전체 날씨 정보 얻어오기

// 각 도시의 날씨 구하기
function getWeatherWithCity(q) {
  var temp = {}
  var urlAPI =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=10c9d93b5bb786ac2df8e5429b6b3390&lang=kr&q=" +
    q

  $.ajax({
    type: "GET",
    url: urlAPI,
    dataType: "json",
    async: false,
    success: function (data) {
      const celsuis = data.main.temp
      const feels_celsuis = data.main.feels_like
      const icon = data.weather[0].icon
      const description = data.weather[0].description
      const humidity = data.main.humidity
      const wind_speed = data.wind.speed
      const clouds = data.clouds.all
      const visibility = data.visibility
      const weather_main = data.weather[0].main
      const temp_max = data.main.temp_max
      const temp_min = data.main.temp_min

      temp.celsuis = celsuis.toFixed(0)
      temp.icon = icon
      temp.description = description
      temp.feels_like = feels_celsuis
      temp.humidity = humidity
      temp.windspeed = wind_speed
      temp.clouds = clouds
      temp.visibility = visibility
      temp.weather_main = weather_main
      temp.temp_max = temp_max
      temp.temp_min = temp_min

      var iconURL = "https://openweathermap.org/img/wn/" + temp.icon + ".png"
      $(".weather_img").attr("src", iconURL)
      console.log(data)
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
// 4. 데이터 바인딩
let temp = getWeatherWithCity(q)

$(".region-title").text(`${krcity} 상세날씨`)
$(".nowtime").text(`${hours}:${min}`)
$(".region_name").text(krcity)
$(".cloud_status").text(temp.description)
$(".celcius").text(`${temp.celsuis}℃`)
$(".feels_celcius").text(temp.feels_like)
$(".humidity").text(temp.humidity)
$(".wind_speed").text(temp.windspeed)
$(".cloud").text(temp.clouds)
$(".visibility").text(temp.visibility + "미터")
$(".weather_main").text(temp.weather_main)
$(".temp_max").text(temp.temp_max + "℃")
$(".temp_min").text(temp.temp_min + "℃")

console.log(temp)
