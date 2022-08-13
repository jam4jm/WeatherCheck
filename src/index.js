function timeFormat() {
  let now = new Date();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = day[now.getDay()];
  let hours = now.getHours();
  hours = hours.toString().padStart(2, "0");
  let minutes = now.getMinutes();
  minutes = minutes.toString().padStart(2, "0");
  let time = document.querySelector("#time");
  time.innerHTML = `${weekday}, ${hours}:${minutes}`;
}

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#citySearch");
  let inputCity = input.value;
  inputCity = inputCity.trim().toLowerCase();
  let apiKey = "5d9e2b27efed7d8f99a351a14fe276b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  function cityInput(response) {
    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;
  }
  axios.get(apiUrl).then(cityInput);
  axios.get(apiUrl).then(nowTemperature);
}

function nowTemperature(response) {
  let now = Math.round(response.data.main.temp);
  let nowTemperature = document.querySelector("#nowTemperature");
  nowTemperature.innerHTML = `${now}°C`;
  let nowType = document.querySelector("#nowType");
  nowType.innerHTML = response.data.weather[0].main;
  let humidity = Math.round(response.data.main.humidity);
  let nowHumidity = document.querySelector("#humidity");
  nowHumidity.innerHTML = `${humidity} %`;
  let wind = Math.round(response.data.wind.speed);
  let nowWind = document.querySelector("#wind");
  nowWind.innerHTML = `${wind} m/s`;
  let pressure = Math.round(response.data.main.pressure);
  let nowPressure = document.querySelector("#pressure");
  nowPressure.innerHTML = `${pressure} hPa`;
  let icon = response.data.weather[0].icon;
  let nowWeatherIcon = document.querySelector("#todayWeatherIcon");
  nowWeatherIcon.setAttribute("src", `img/${icon}.png`);
}
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  function currentWeather() {
    let apiKey = "5d9e2b27efed7d8f99a351a14fe276b8";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    function currentCity(response) {
      let cityName = document.querySelector("#city");
      cityName.innerHTML = response.data.name;
    }
    axios.get(apiUrl).then(nowTemperature);
    axios.get(apiUrl).then(currentCity);
  }
  return currentWeather();
}
timeFormat();
navigator.geolocation.getCurrentPosition(currentPosition);
let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", citySearch);
