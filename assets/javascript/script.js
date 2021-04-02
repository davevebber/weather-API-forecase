//const 
const apiKey = 'd748733e2081840aba6654717752a32b';
const searchBtn = document.querySelector('#searchBtn');
const currentBox = document.querySelector('.current-box');
const forecastBox = document.querySelector('.forecast-box');
const searchHistory = document.querySelector('#search-history');
const currentForecast = document.querySelector('#current-forecast');
const fourDayForecast = document.querySelector('#four-day-forecast');


// dates
let date = (moment().format('ddd, MMM Do'));

// variables
let searchHistoryArr = JSON.parse(localStorage.getItem('cities')) || []

// icons
let currentDayIcon = document.querySelector('#currentIcon');

// for current day weather
let cityName = document.querySelector('#cityName');
let currentDate = document.querySelector('#date');
let temp = document.querySelector('#temp');
let humid = document.querySelector('#humid');
let wind = document.querySelector('#wind');
let uv = document.querySelector('#uv');

searchBtn.addEventListener('click', getCityWeather);

// UVI warnings
let yellowWarning = document.querySelector('#uv-warning-yellow');
let redWarning = document.querySelector('#uv-warning-red');

function displaySearchHistory() {
    firstSearch.innerHTML = localStorage.getItem(searchHistoryArr[1]);
}

function getCityWeather() {
    // save searches into array
    let searchCity = document.querySelector('#searchCity').value;
    searchHistoryArr.push(searchCity)
    localStorage.setItem('cities', JSON.stringify(searchHistoryArr));

    // fetch weather info for current forecast and long+lat for 4 day forecast
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&APPID=' + apiKey + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            // post current forecast
            currentForecast.innerHTML = ''

            currentForecast.innerHTML =
                `<h4>${data.name}, ${date}</h4>   
                       <span><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png"></span>
                        <p>Temperature: ${data.main.temp}°F</p>
                        <p>Humidity: ${data.main.humidity}%</p>
                        <p>Wind Speed: ${data.wind.speed} MPH</p>`

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial' + '&APPID=' + apiKey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);

                    currentForecast.innerHTML += `<p>UV Index: ${data.daily[0].uvi}</p>`
                    if (data.daily[0].uvi == 1000) {
                        currentForecast.innerHTML +=
                            `<span id="uv-warning-yellow"><img class="warning-icon"
                            src="./assets/images/warning-yello.jpg"></span>`
                    } else {
                        `<span id="uv-warning-red"><img class="warning-icon"
                        src="./assets/images/warning-red.png"></span>`
                    }

                    // posting the 4-day-forecast
                    fourDayForecast.innerHTML = ''

                    for (let i = 0; i < 4; i++) {
                        let momentDate = moment().add(i + 1, 'days').format('MMM Do')

                        fourDayForecast.innerHTML +=
                            `<div id="card" class="col-3">
                            <p>${momentDate}</p>
                            <span><img src="https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}.png"></span>
                            <p>Temp:${data.daily[i].temp.day}°F</p>
                            <p>Wind Speed:${data.daily[i].wind_speed}MPH</p>
                            <p>UV Index:${data.daily[i].uvi}</p>
                            </div>`
                    };

                    currentBox.classList.remove('hide');
                    forecastBox.classList.remove('hide');

                });
        })
};