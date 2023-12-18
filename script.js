var APIKey = '0239f425bc2ae16f6f0c6a0c55908966';

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('search-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var cityName = document.getElementById('search-input').value;
        if (cityName.trim() !== '') {
            getCityWeather(cityName);
        } else {
            alert('Please enter city name.');
        }
    }); 
});

function displaySearchHistory() {
    var history = localStorage.getItem('searchHistory');
    var historyArray = history ? JSON.parse(history) : [];
    var historyElement = document.getElementById('history');

    historyElement.innerHTML = '';

    historyArray.forEach(function (city) {
        var historyItem = document.createElement('button');
        historyItem.textContent = city;
        historyItem.className = 'history-item btn btn-primary m-1';
        historyItem.addEventListener('click', function () {
            getCityWeather(city);
        });
        historyElement.appendChild(historyItem);
    });
}

function getCityWeather(city) {
    var cityWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&exclude=minutely,alerts&units=metric&lang=en`;
    var forecastEndpoint = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`;

    fetch(cityWeatherEndpoint)
        .then((response) => {
            if (!response.ok) {
                throw new Error('City Weather not found.');
            }
            return response.json();
        })
        .then((data) => {
            displayWeatherData(data);
            addToSearchHistory(city);
            return fetch(forecastEndpoint);
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Forecast data not available.');
            }
            return response.json();
        })
        .then((forecastData) => {
            displayWeatherForecast(forecastData);
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Something went wrong, please try again.');
    });
} 

function displayWeatherData(data) {
    var weatherInfo = document.getElementById('weather-info');
    var cityName = data.name;
    var currentDate = new Date(data.dt * 1000);
    var iconCode = data.weather[0].icon;
    var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

    weatherInfo.innerHTML = `
        <h2>Weather Details for ${cityName}</h2>
        <p>Date: ${currentDate.toDateString()}</p>
        <img src="${iconUrl}" alt="Weather Icon">
        <p>Temperature: ${data.main.temp}</p>
        <p>Humidity: ${data.main.humidity}</p>
        <p>Wind Speed: ${data.wind.speed}</p>
    `;
} 

function displayWeatherForecast(forecastData) {
    var dailyForecastElement = document.getElementById('daily-forecast');
    dailyForecastElement.innerHTML = ''; 

    if (forecastData.list) {
        for (let index = 0; index < forecastData.list.length; index += 8) {
        var forecast = forecastData.list[index];
        var forecastDate = new Date(forecast.dt * 1000);
        var forecastIcon = forecast.weather[0].icon;
        var forecastIconUrl = `http://openweathermap.org/img/w/${forecastIcon}.png`;

        var forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');

        forecastCard.innerHTML = `
        <h3>${forecastDate.toDateString()}</h3>
        <img src="${forecastIconUrl}" alt="Weather Icon">
        <p>Temperature: ${convertKelvinToCelsius(forecast.main.temp)}°C</p>
        <p>Humidity: ${forecast.main.humidity}</p>
        <p>Wind Speed: ${forecast.wind.speed}</p>
        `; 
            dailyForecastElement.appendChild(forecastCard); 
        }
    } else {
        console.log('No daily forecast data available.'); 
    }
}

function addToSearchHistory(city) {
    var history = localStorage.getItem('searchHistory');
    var historyArray = history ? JSON.parse(history) : [];

    if (!historyArray.includes(city)) {
        historyArray.push(city);
        localStorage.setItem('searchHistory', JSON.stringify(historyArray));
    }

    displaySearchHistory();
}
