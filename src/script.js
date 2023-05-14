//DATE
let currDate = document.querySelector(".date");
let now = new Date();
let days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
let weekDay = now.getDay();
let hours = now.getHours();
let minutes = now.getMinutes();

if(hours < 10) {
    hours = `0${hours}`;
}

if(minutes < 10) {
    minutes = `0${minutes}`;
}

currDate.innerHTML = `${days[weekDay]} ${hours}:${minutes}`;

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();

return days[day];
}

function displayForecast(response) {
  
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    forecast.forEach(function(forecast, index) {
        if (index < 6) {
        forecastHTML = 
        forecastHTML +
    `
    <div class="col-2">
      <div class="forecast-day">${formatDay(forecast.dt)}
      </div>
      <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="icon" width="26">
      <div class="week-temperatures">
        <span class="day-temp-max">${Math.round(forecast.temp.max)}&deg;</span>
        <span class="day-temp-min">${Math.round(forecast.temp.min)}&deg;</span>
      </div>
    </div>
  `;}
    })
    
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    
    let apiKey = `97bed167ec49bff56e6c1b63daef9c86`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
    
}

//CITY SUBMIT
function displayWeatherConditions(response) {
    document.querySelector("#city-result").innerHTML = response.data.name;
    celcTemp = response.data.main.temp;
    document.querySelector("#degrees").innerHTML = Math.round(celcTemp);
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
    document.querySelector("#temp-feels").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)

    getForecast(response.data.coord);
}

function showCity(event) {
    event.preventDefault();
    let apiKey = `2b7e1bf11ce738269e654a4612c53e9a`;
    let cityName = document.querySelector("#search-input").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(displayWeatherConditions);

}

let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", showCity);

function showPosition(position) {
    let keyApi = `2b7e1bf11ce738269e654a4612c53e9a`;
    let urlLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${keyApi}&units=metric`;
    axios.get(`${urlLocation}&appid=${keyApi}`).then(displayWeatherConditions);    
}


function getLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);

}

let locationBtn = document.querySelector("#location");
locationBtn.addEventListener("click", getLocation);


//Unit converter
let celcLink = document.querySelector("#celc");
let fahrLink = document.querySelector("#fahr");
let celcTemp = null;

        function calcF(event) {
            event.preventDefault();
            let tempElement = document.querySelector("#degrees");
            let tempF = (celcTemp * 9) / 5 + 32;
            tempElement.innerHTML = Math.round(tempF);
            }

        fahrLink.addEventListener("click", calcF);

        function calcC() {
            let degrees = document.querySelector("#degrees");
            degrees.innerHTML = Math.round(celcTemp);
        }
        celcLink.addEventListener("click", calcC);   

