//const 
const apiKey = 'd748733e2081840aba6654717752a32b';
const searchBtn = document.querySelector('#searchBtn');
const currentBox = document.querySelector('.current-box');
const forecastBox = document.querySelector('.forecast-box');
const searchHistory = document.querySelector('#search-history');

// dates
let date = (moment().format('ddd, MMM Do'));
let dateOne = moment().add(1, 'days').format('MMM Do');
let dateTwo = moment().add(2, 'days').format('MMM Do');
let dateThree = moment().add(3, 'days').format('MMM Do');
let dateFour = moment().add(4, 'days').format('MMM Do');

// variables
let searchHistoryArr = []
let currentDayIcon = document.querySelector('#currentIcon');
let dayOneIcon = document.querySelector('#dayOneIcon');
let dayTwoIcon = document.querySelector('#dayTwoIcon');
let dayThreeIcon = document.querySelector('#dayThreeIcon');
let dayFourIcon = document.querySelector('#dayFourIcon');

// for current day weather
let cityName = document.querySelector('#cityName');
let currentDate = document.querySelector('#date');
let temp = document.querySelector('#temp');
let humid = document.querySelector('#humid');
let wind = document.querySelector('#wind');
let uv = document.querySelector('#uv');

// UVI warnings
let yellowWarning = document.querySelector('#uv-warning-yellow');
let redWarning = document.querySelector('#uv-warning-red');

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

// for search history
const firstSearch = document.querySelector('#first-search')
const secondSearch = document.querySelector('#second-search')
const thirdSearch = document.querySelector('#third-search')
const fourthSearch = document.querySelector('#fourth-search')
const fifthSearch = document.querySelector('#fifth-search')

function displaySearchHistory() {
    firstSearch.innerHTML = localStorage.getItem(searchHistoryArr[0]);

}

// const info = document.querySelector('#info');
//             const button  = document.querySelector('#button');
//             const cityDiv = document.getElementById('cityDiv');
//             const store = window.localStorage;
//             let storageArr = [];
// //             const oldCities = JSON.parse(window.localStorage.getItem("cities")) || [];
//             button.addEventListener('click', ()=>{
//                 storageArr.push(info.value);
//                 store.setItem('cities',JSON.stringify(storageArr));
//             });
// for(let i = 0; i < oldCities.length;i++){
//     cityDiv.innerHTML += <div>${oldCities[i]}</div>;
// }
// oldCities.forEach(element => {
//     cityDiv.innerHTML += <div>${element}</div>;
// });


function getCityWeather() {
    // save searches into array
    let searchCity = document.querySelector('#searchCity').value;
    searchHistoryArr.push(searchCity)
    localStorage.setItem('cities', JSON.stringify(searchHistoryArr));

    // pull cities from array and post on search history
    firstSearch.innerHTML = searchHistoryArr[0];
    secondSearch.innerHTML = searchHistoryArr[1];
    thirdSearch.innerHTML = searchHistoryArr[2];
    fourthSearch.innerHTML = searchHistoryArr[3];
    fifthSearch.innerHTML = searchHistoryArr[4];


        fetch('http://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&APPID=' + apiKey + '&units=imperial')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);

                // create icon
                iconCode = data.weather[0].icon
                currentDayIcon.src = 'https://openweathermap.org/img/wn/' + iconCode + '.png';

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
                        uv.innerHTML = 'UV Index: ' + data.current.uvi;

                        // which warning icon to display 
                        if (data.current.uvi < 7) {
                            yellowWarning.classList.remove('hide');
                        } else {
                            redWarning.classList.remove('hide');
                        }

                        // icons for forecast day 1
                        dayOneIconCode = data.daily[0].weather[0].icon
                        dayOneIcon.src = 'https://openweathermap.org/img/wn/' + dayOneIconCode + '.png';

                        // icons for forecast day 2
                        dayTwoIconCode = data.daily[1].weather[0].icon
                        dayTwoIcon.src = 'https://openweathermap.org/img/wn/' + dayTwoIconCode + '.png';

                        // icons for forecast day 3
                        dayThreeIconCode = data.daily[2].weather[0].icon
                        dayThreeIcon.src = 'https://openweathermap.org/img/wn/' + dayThreeIconCode + '.png';

                        // icons for forecast day 4
                        dayFourIconCode = data.daily[3].weather[0].icon
                        dayFourIcon.src = 'https://openweathermap.org/img/wn/' + dayFourIconCode + '.png';

                        // forecast day 1
                        dayOneDate.innerHTML = dateOne;

                        dayOneIconCode = data.daily[0].weather[0].icon
                        dayOneIcon.src = 'https://openweathermap.org/img/wn/' + dayOneIconCode + '.png';

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
        currentBox.classList.remove('hide');
        forecastBox.classList.remove('hide');
    };





    searchBtn.addEventListener('click', getCityWeather);
