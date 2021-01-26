//const 
const apiKey = 'd748733e2081840aba6654717752a32b';
const searchBtn = document.querySelector('#searchBtn');
const currentBox = document.querySelector('.current-box');
const forecastBox = document.querySelector('.forecast-box')

// dates
let date = (moment().format('ddd, MMM Do'));
let dateOne = moment().add(1,'days').format('MMM Do');
let dateTwo = moment().add(2,'days').format('MMM Do');
let dateThree = moment().add(3,'days').format('MMM Do');
let dateFour = moment().add(4,'days').format('MMM Do');

// variables
let searchArr = []

// for current day weather
let cityName = document.querySelector('#cityName');
let currentDate = document.querySelector('#date');
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
    currentBox.classList.remove('hide');
    forecastBox.classList.remove('hide');

    let searchCity = document.querySelector('#searchCity').value;
    localStorage.setItem('searchHistory', searchCity);

    fetch('http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&APPID=' + apiKey + '&units=imperial')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {

            // current day weather info
            cityName.innerHTML = data.name + ': ' + date;
            temp.innerHTML = 'Temperature: ' + data.main.temp + '°F';
            humid.innerHTML = 'Humidity: ' + data.main.humidity + '%';
            wind.innerHTML = 'Wind Speed: ' + data.wind.speed + ' MPH';

            fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + data.coord.lat + '&lon=' + data.coord.lon + '&units=imperial' + '&APPID=' + apiKey)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // current day UV index
                    uv.innerHTML = 'UV Index: ' + data.current.uvi

                    // forecast day 1
                    dayOneDate.innerHTML = dateOne;
                    dayOneTemp.innerHTML = 'Temp: ' + data.daily[0].temp.day + '°F';
                    dayOneWind.innerHTML = 'Wind Speed: ' + data.daily[0].wind_speed + ' MPH';
                    dayOneUV.innerHTML = 'UV Index: ' + data.daily[0].uvi;
                   
                    // forecast day 2
                    dayTwoDate.innerHTML = dateTwo;
                    dayTwoTemp.innerHTML = 'Temp: ' + data.daily[1].temp.day + '°F';
                    dayTwoWind.innerHTML = 'Wind Speed: ' + data.daily[1].wind_speed + ' MPH';
                    dayTwoUV.innerHTML = 'UV Index: ' + data.daily[1].uvi;
                   
                    // forecast day 3
                    dayThreeDate.innerHTML = dateThree;
                    dayThreeTemp.innerHTML = 'Temp: ' + data.daily[2].temp.day + '°F';
                    dayThreeWind.innerHTML = 'Wind Speed: ' + data.daily[2].wind_speed + ' MPH';
                    dayThreeUV.innerHTML = 'UV Index: ' + data.daily[2].uvi;
                    
                    // forecast day 4
                    dayFourDate.innerHTML = dateFour;
                    dayFourTemp.innerHTML = 'Temp: ' + data.daily[3].temp.day + '°F';
                    dayFourWind.innerHTML = 'Wind Speed: ' + data.daily[3].wind_speed + ' MPH';
                    dayFourUV.innerHTML = 'UV Index: ' + data.daily[3].uvi;
                    
                });
        });
};





searchBtn.addEventListener('click', getCityWeather);
