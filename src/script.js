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


//CITY SUBMIT
function displayWeatherConditions(response) {
    console.log(response.data);
    document.querySelector("#city-result").innerHTML = response.data.name;
    document.querySelector("#degrees").innerHTML = Math.round(response.data.main.temp);
    document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
    document.querySelector("#temp-feels").innerHTML = Math.round(response.data.main.feels_like);
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#weather-icon").setAttribute("src", `https://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`)
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