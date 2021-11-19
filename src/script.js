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
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#place");
  cityElement.innerHTML = `${city}`;
  let tempElement = document.querySelector("#temp");
  tempElement.innerHTML = `${temperature}°C`;
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "617506cfb547850165759cc5c0eb0187";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}
function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let local = document.querySelector("#current");
local.addEventListener("click", getCurrentPosition);
