var APIKey = '0239f425bc2ae16f6f0c6a0c55908966';
    // var queryURL = 'https://api.openweathermap.org/data/2.5/weather?q=York&appid=0239f425bc2ae16f6f0c6a0c55908966';

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('search-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
    }) 

        var cityName = document.getElementById('search-input').value;
        if (cityName.trim() !== '') {
            getCityWeather(cityName);
        } else {
            console.log('Failed to enter city name');
            alert('Please enter city name.')
        }
    });

function addToSearchHistory(city) {
    var historyElement = document.getElementById('History');
    var historyItem = document.createElement('div');
    historyItem.textContent = city; 
    historyItem.classList.add('history-item'); 
    historyItem.addEventListener("click", function () {
        getCityWeather(city);
 });
 historyElement.appendChild(historyItem); 
}

function getCityWeather(city) {
    var cityWeatherEndpoint = 'https://api.openweathermap.org/data/2.5/weather?q={city}&appid=0239f425bc2ae16f6f0c6a0c55908966';
   
    fetch(cityWeatherEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City not found.');
            }
            return response.json();
        })
        .then((data) => {
            displayWeatherData(data); 
        }) 
        .catch((error) => {
            console.error('Error: ', error); 
            alert('City not found, please try again.');
        });
    } 
    
function displayWeatherData(data) {
    var weatherInfo = document.getElementById('weather-info'); 
    var cityName = data.name; 
    

    weatherInfo.innerHTML = `
    <h2>Weather Details for ${data.name}</h2>
    <p>Temperature: ${data.main.temp}</p>
    <p>Humidity: ${data.main.humidity}</p>
    <p>Wind Speed: ${data.wind.speed} </p>
    `; 
}

function displayForecast(forecastData) {
    var forecast = document.getElementById('forecast');
    forecast.innerHTML = '';

    for (let index = 0; index < forecastData.length; index++) {
        var forecast = forecastData.list[index];
        // var forecastDate = 
        var forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');

        // date append 

        var Temperature = document.createElement('p');
        Temperature.textContent = 'Temperature: ${forecast.main.temp}';
        forecastItem.appendChild(Temperature); 

        var humidity = document.createElement('p');
        humidity.textContent = 'Humidity: ${forecaste.main.humidity}';
        forecastItem.appendChild(forecastItem);
    }
}





// add current date to page 

// fetch weather data using API 

// display weather infomation dynamically into HTML

// use local storage to store searched cities 

// event listeners for form submission 

// retrieve city name from input 

// fetch city weather data using coordinates from openweather API

