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
