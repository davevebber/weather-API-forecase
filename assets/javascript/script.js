//const 
const apiKey = 'd748733e2081840aba6654717752a32b';
const searchBtn = document.querySelector('#searchBtn');

// variables
let searchArr = []

// for current day weather
let cityName = document.querySelector('#cityName');
let temp = document.querySelector('#temp');
let humid = document.querySelector('#humid');
let wind = document.querySelector('#wind');
let uv = document.querySelector('#uv');

// for forecast weather
let dayOneDate = document.querySelector('#dayOneDate');
let dayOneTemp = document.querySelector('#dayOneTemp');
let dayOneWind = document.querySelector('#dayOneWind');
let dayOneUV = document.querySelector('#dayOneUV');

let dayTwoDate = document.querySelector('#dayTwoDate');
let dayTwoTemp = document.querySelector('#dayTwoTemp');
let dayTwoWind = document.querySelector('#dayTwoWind');
let dayTwoUV = document.querySelector('#dayTwoUV');

let dayThreeDate = document.querySelector('#dayThreeDate');
let dayThreeTemp = document.querySelector('#dayThreeTemp');
let dayThreeWind = document.querySelector('#dayThreeWind');
let dayThreeUV = document.querySelector('#dayThreeUV');

let dayFourDate = document.querySelector('#dayFourDate');
let dayFourTemp = document.querySelector('#dayFourTemp');
let dayFourWind = document.querySelector('#dayFourWind');
let dayFourUV = document.querySelector('#dayFourUV');


function getCityWeather() {
    let searchCity = document.querySelector('#searchCity').value;
    localStorage.setItem('searchHistory', searchCity);

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&APPID=' + apiKey + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            cityName.innerHTML = data.name;
            temp.innerHTML = 'Temperature: ' + data.main.temp + '°F';
            humid.innerHTML = 'Humidity: ' + data.main.humidity + '%';
            wind.innerHTML = 'Wind Speed: ' + data.wind.speed + 'MPH';

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&APPID=' + apiKey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data)
                    uv.innerHTML = 'UV Index: ' + data.current.uvi
                });
        });
};





searchBtn.addEventListener('click', getCityWeather, getForecast);
