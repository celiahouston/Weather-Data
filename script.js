document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('search-form');

    form.addEventListener('submit', function (event)) {
        event.preventDefault();
    }

    var cityName = document.getElementById('search-input').value;
    if (cityName.trim() !=== '') {
    getCityWeather(cityName);
    } else {
    console.log('Failed to enter city name');
    alert('Plase enter city name.')
    }
});

var APIKey = '0239f425bc2ae16f6f0c6a0c55908966'; 
var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=York&appid=0239f425bc2ae16f6f0c6a0c55908966'; 

function getCityWeather(cityName) {
    fetch(queryURL)
    .then(())

    getWeatherData(lat, lon) {

    }

    fetch()

}


// fetch weather data using API 

// display weather infomation dynamically into HTML

// use local storage to store searched cities 

// event listeners for form submission 

// retrieve city name from input 

// fetch city weather data using coordinates from openweather API

