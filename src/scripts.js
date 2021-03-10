// *************** Search for a city ****************
function displayWeather(response) {
  // console.log(response.data.name);
  let cityElement = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector('#icon');
  //let dateElement = document.querySeletctor("#date-time");
 celsiusDegrees = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusDegrees);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].main;
  //dateElement.innerHTML = formatDate(response.data.dt * 1000);

  // setting icon attributes for forecast
  iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      //To customize icons, view source at https://openweathermap.org/weather-conditions
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function dispalyForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  // evenly displayed 
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h3>
        ${formatHours(forecast.dt * 1000)}
      </h3>
       <img
         src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
       />
      <div class="weather-forecast-temperature">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

// *****************Search for current location*****************

// function showWeather(response) {
//   let temperatureElement = document.querySelector("#temperature");
//   let humidityElement = document.querySelector("#humidity");
//   let windElement = document.querySelector("#wind");
//   let descriptionElement = document.querySelector("#weather-description");
//   let iconElement = document.querySelector('#icon');
//   //let dateElement = document.querySeletctor("#date-time");
//   let celsiusDegrees = Math.round(response.data.main.temp);

//    //temperatureElement.innerHTML = celsiusDegrees;
//     temperatureElement.innerHTML = `${celsiusDegrees}° @${response.data.name}`
//     humidityElement.innerHTML = response.data.main.humidity;
//     windElement.innerHTML = Math.round(response.data.wind.speed);
//     descriptionElement.innerHTML = response.data.weather[0].main;
//     //dateElement.innerHTML = formatDate(response.data.dt * 1000);

//     // setting icon attributes for forecast
//     iconElement.setAttribute(
//         "src",
//         `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
//       );
//       iconElement.setAttribute("alt", response.data.weather[0].description);
// }

function weatherHere(position) {
let Key = "2bbfd89a2b1f299294c283ec9aa8c6e0";
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let posUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${Key}`;
axios.get(posUrl).then(displayWeather);
posUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${Key}`;
axios.get(posUrl).then(dispalyForecast);

}

function localWeatherNow(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(weatherHere);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", localWeatherNow);

//*************** City Temperature Search *******************
function search(city) {
  // Make an API call o get real data rom OpenWeather
  //Response include city and temperature
  let key = "2bbfd89a2b1f299294c283ec9aa8c6e0";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(dispalyForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityEntry = document.querySelector("#city-input").value; //#city
  search(cityEntry);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// ***************** Date Time **********************

// format date time for forecasts
function formatDate(timestamp) {
let date = new Date(timestamp);

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[date.getDay()];
let months = [
  "Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"
  ];
month = months[date.getMonth()];

return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

return `${hours}:${minutes}`;

//return `${day} ${month} ${dayOfMonth}, ${hours}:${minutes}`;
}

// ********* date time for current weather forecast **********
let now = new Date();
console.log(now.getDate());
// select display section for current date and time
let li = document.querySelector("#date-time");

// Current time is shown although temperature updated at slightly delayed speed from OpenWeather
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  hours = `0${minutes}`;
}

//let day = now.getDay(); // 0 and 6
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan","Feb","Mar","Apr","May","Jun","July","Aug","Sep","Oct","Nov","Dec"
  ];
let month = months[now.getMonth()];

li.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;



// ************ Celsius Fahrenheit ******************
//celsiusDegrees = response.data.main.temp;

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusUnit.classList.remove("active");
  fahrenheitUnit.classList.add("active");
  let fahrenheitDegrees = (celsiusDegrees * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitDegrees);
}

let fahrenheitUnit = document.querySelector("#fahrenheit");
fahrenheitUnit.addEventListener("click", convertToFahrenheit);


function convertToCelsius(event) {
  event.preventDefault();
  celsiusUnit.classList.add("active");
  fahrenheitUnit.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusDegrees);
}
let celsiusUnit = document.querySelector("#celsius");
celsiusUnit.addEventListener("click", convertToCelsius);

let celsiusDegrees = null;

search("San Francisco");