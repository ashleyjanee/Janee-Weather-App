let today = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let hours = today.getHours();
let minutes = today.getMilliseconds();
let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;
function search(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-input");
  let apiKey = "617506cfb547850165759cc5c0eb0187";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-input");
form.addEventListener("submit", search);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col-2">
            <div class="weather-forecast-date">${day}</div>
            <img
              src="https://ssl.gstatic.com/onebox/weather/48/rain.png"
              alt=""
              width="36"
            />
            <div class="weather-forecast-temp">
              <span class="weather-forecast-temp-max">22°</span>
              <span class="weather-forecast-temp-min">-5°</span>
            </div>
          </div>
        `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "617506cfb547850165759cc5c0eb0187";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let city = response.data.name;
  celsiusTemp = response.data.main.temp;
  let temperature = Math.round(celsiusTemp);
  let cityElement = document.querySelector("#place");
  cityElement.innerHTML = `${city}`;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temperature}°C`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);

  getForecast(response.data.coord);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "617506cfb547850165759cc5c0eb0187";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function showFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temp");
  let tempFah = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(tempFah);
}
let fahrenheit = document.querySelector("#Fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let tempCel = document.querySelector("#temp");
  tempCel.innerHTML = Math.round(celsiusTemp);
}
let celsius = document.querySelector("#Celsius");
celsius.addEventListener("click", showCelsius);

let celsiusTemp = null;

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let local = document.querySelector("#current");
local.addEventListener("click", getCurrentPosition);
