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
function dayFormat(time) {
  let date = new Date(time * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = date.getDay();
  let dayDate = date.getDate();
  dayDate = dayDate.toString().padStart(2, "0");
  return `${days[day]} ${dayDate}`;
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
  forecast(response.data.coord);
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

function forecast(coordinates) {
  let apiKey = "5d9e2b27efed7d8f99a351a14fe276b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(forecastTemperature);
}
function forecastTemperature(response) {
  let forecast = response.data.daily;
  let todayMaxTemperature = Math.round(forecast[0].temp.max);
  let maxTemperature = document.querySelector("#maxTemperature");
  maxTemperature.innerHTML = `${todayMaxTemperature}°C`;
  let todayMinTemperature = Math.round(forecast[0].temp.min);
  let minTemperature = document.querySelector("#minTemperature");
  minTemperature.innerHTML = `${todayMinTemperature}°C`;
  let dayForecast = `<div class="row dayForecast" id="dayForecast">`;
  forecast.forEach(function eachDay(forecastDay, index) {
    if (index >= 1 && index <= 4) {
      dayForecast =
        dayForecast +
        `<div class="col-sm-3 dayForecast">
              <div class="date">${dayFormat(forecastDay.dt)}</div>
              <div class="maxDayTemperature">${Math.round(
                forecastDay.temp.max
              )}°C</div>
              <div class="minDayTemperature">${Math.round(
                forecastDay.temp.min
              )}°C</div>
              <img class="forecastWeatherIcon" src="img/${
                forecastDay.weather[0].icon
              }.png" />
            </div>
          `;
    }
  });
  dayForecast = dayForecast + `</div>`;
  let dailyForecast = document.querySelector("#dayForecast");
  dailyForecast.innerHTML = dayForecast;
}

timeFormat();
citySearch("kyiv");
navigator.geolocation.getCurrentPosition(currentPosition);
let cityForm = document.querySelector("#cityForm");
cityForm.addEventListener("submit", formSubmіt);
