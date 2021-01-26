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

            // current day weather info
            cityName.innerHTML = data.name;
            temp.innerHTML = 'Temperature: ' + data.main.temp + '°F';
            humid.innerHTML = 'Humidity: ' + data.main.humidity + '%';
            wind.innerHTML = 'Wind Speed: ' + data.wind.speed + 'MPH';

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial' + '&APPID=' + apiKey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // current day UV index
                    uv.innerHTML = 'UV Index: ' + data.current.uvi
                    // forecast day 1
                    dayOneTemp.innerHTML = 'Temp: ' + data.daily[0].temp.day;
                    dayOneWind.innerHTML = 'Wind Speed: ' + data.daily[0].wind_speed;
                    dayOneUV.innerHTML = 'UV Index: ' + data.daily[0].uvi;
                    // forecast day 2
                    dayTwoTemp.innerHTML = 'Temp: ' + data.daily[1].temp.day;
                    dayTwoWind.innerHTML = 'Wind Speed: ' + data.daily[1].wind_speed;
                    dayTwoUV.innerHTML = 'UV Index: ' + data.daily[1].uvi;
                    // forecast day 3
                    dayThreeTemp.innerHTML = 'Temp: ' + data.daily[2].temp.day;
                    dayThreeWind.innerHTML = 'Wind Speed: ' + data.daily[2].wind_speed;
                    dayThreeUV.innerHTML = 'UV Index: ' + data.daily[2].uvi;
                    // forecast day 4
                    dayFourTemp.innerHTML = 'Temp: ' + data.daily[3].temp.day;
                    dayFourWind.innerHTML = 'Wind Speed: ' + data.daily[3].wind_speed;
                    dayFourUV.innerHTML = 'UV Index: ' + data.daily[3].uvi;
                    
                });
        });
};





searchBtn.addEventListener('click', getCityWeather);
