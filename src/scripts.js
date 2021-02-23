// Search for a city
function displayWeather(response) {
    // console.log(response.data.name);
    let cityElement = document.querySelector("#city");
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let descriptionElement = document.querySelector("#weather-description");
    let iconElement = document.querySelector('#icon');

    cityElement.innerHTML = response.data.name;
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.weather[0].main;

    // setting icon attributes for forecast
    iconElement.setAttribute(
        "src",
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
      );
      iconElement.setAttribute("alt", response.data.weather[0].description);
    
    celsiusDegrees = response.data.main.temp;
}

function dispalyForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
  
    for (let index = 0; index < 6; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-2">
        <h3>
          ${formatHours(forecast.dt * 1000)}
        </h3>
        <img
          src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"
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
  
//*************** City Temperature Search *******************
function search(city) {
    // Make an API call o get real data rom OpenWeather
    //Response include city and temperature
    let key = "2bbfd89a2b1f299294c283ec9aa8c6e0";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    axios.get(url).then(displayWeather);
}

function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value; //#city
    search(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// *****************Search for current location*****************

function searchLocation(position) {
    let key = "2bbfd89a2b1f299294c283ec9aa8c6e0";
    let posUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${posKey}&units=metric`;
    axios.get(posUrl).then(displayWeather);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let units = "imperial";
    axios.get(posUrl).then(displayWeather);
}

function getCurrentLocation(event) {
    event.preventDefault();
    // navigator.geolocation.getCurrentPosition(function(position) {
    //     do_something(position.coords.latitude, position.coords.longitude);
    // })
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation)

// ***************** Date Time **********************
let now = new Date();
console.log(now.getDate());

let li = document.querySelector("#date-time");

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
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];
let month = months[now.getMonth()];

li.innerHTML = `${day} ${month} ${date}, ${hours}:${minutes}`;

// ************ Celsius Fahrenheit ******************

function convertToFahrenheit(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitDegrees = (celsiusDegrees * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitDegrees);
  }
  
  let fahrenheitUnit = document.querySelector("#fahrenheit");
  fahrenheitUnit.addEventListener("click", convertToFahrenheit);


  function convertToCelsius(event) {
    event.preventDefault();
    celsiusUnit.classList.remove("active");
    fahrenheitUnit.classList.add("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusDegrees);
  }
  let celsiusUnit = document.querySelector("#celsius");
  celsiusUnit.addEventListener("click", convertToCelsius);
  
  let celsiusTemperature = null;

searchCity("San Francisco");