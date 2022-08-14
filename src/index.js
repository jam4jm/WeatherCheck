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
function citySearch(inputCity) {
  let apiKey = "5d9e2b27efed7d8f99a351a14fe276b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
  function cityInput(response) {
    let cityName = document.querySelector("#city");
    cityName.innerHTML = response.data.name;
  }
  axios.get(apiUrl).then(cityInput);
  axios.get(apiUrl).then(nowTemperature);
}

function formSubmіt(event) {
  event.preventDefault();
  let input = document.querySelector("#citySearch");
  let inputCity = input.value;
  inputCity = inputCity.trim().toLowerCase();
  citySearch(inputCity);
}

function nowTemperature(response) {
  let now = Math.round(response.data.main.temp);
  let nowTemperature = document.querySelector("#nowTemperature");
  nowTemperature.innerHTML = `${now}`;
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
  let unit = document.querySelector("#unit");
  unit.innerHTML = "°C";
  celsius = response.data.main.temp;
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
function fahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#nowTemperature");
  let fahrenheit = Math.round(celsius * 1.8 + 32);
  let unit = document.querySelector("#unit");
  temperatureValue.innerHTML = fahrenheit;
  unit.innerHTML = "°F";
  celsiusDisplay.classList.remove("active");
  fahrenheitDisplay.classList.add("active");
}
function celsiusTemperature(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#nowTemperature");
  let unit = document.querySelector("#unit");
  temperatureValue.innerHTML = Math.round(celsius);
  unit.innerHTML = "°C";
  celsiusDisplay.classList.add("active");
  fahrenheitDisplay.classList.remove("active");
}
timeFormat();
citySearch("mariupol");
navigator.geolocation.getCurrentPosition(currentPosition);
let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", formSubmіt);

let celsius = null;
let fahrenheitDisplay = document.querySelector("#fahrenheit");
fahrenheitDisplay.addEventListener("click", fahrenheitTemperature);
let celsiusDisplay = document.querySelector("#celsius");
celsiusDisplay.addEventListener("click", celsiusTemperature);
