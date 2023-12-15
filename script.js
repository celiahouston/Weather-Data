var APIKey = '0239f425bc2ae16f6f0c6a0c55908966';

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('search-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var cityName = document.getElementById('search-input').value;
        if (cityName.trim() !== '') {
            getCityWeather(cityName);
        } else {
            console.log('Failed to enter city name');
            alert('Please enter city name.');
        }
    });

    function addToSearchHistory(city) {
        var history = localStorage.getItem('searchHistory');
        var historyArray = history ? JSON.parse(history) : [];

        if (!historyArray.includes(city)) {
            historyArray.push(city);
            localStorage.setItem('searchHistory', JSON.stringify(historyArray));
        }

        displaySearchHistory();
    }

    function displaySearchHistory() {
        var history = localStorage.getItem('searchHistory');
        var historyArray = history ? JSON.parse(history) : [];
        var historyElement = document.getElementById('history');

        historyElement.innerHTML = '';

        historyArray.forEach(function (city) {
            var historyItem = document.createElement('button');
            historyItem.textContent = city;
            historyItem.className = 'history-item btn btn-primary m-1'; // Setting classes using className
            historyItem.addEventListener('click', function () {
                getCityWeather(city);
            });
            historyElement.appendChild(historyItem);
        });
    }

    function getCityWeather(city) {
        var cityWeatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0239f425bc2ae16f6f0c6a0c55908966`;

        fetch(cityWeatherEndpoint)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('City not found.');
                }
                return response.json();
            })
            .then((data) => {
                displayWeatherData(data);
                addToSearchHistory(city);
            })
            .catch((error) => {
                console.error('Error: ', error);
                alert('City not found, please try again.');
            });
    }

    function displayWeatherData(data) {
        var weatherInfo = document.getElementById('weather-info');
        var cityName = data.name;
        var date = new Date(data.dt * 1000);
        var iconCode = data.weather[0].icon;
        var iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        weatherInfo.innerHTML = `
    <h2>Weather Details for ${data.name}</h2>
    <p>Date: ${date.toDateString()}</p>
    <img src="${iconUrl}" alt="Weather Icon"> 
    <p>Temperature: ${data.main.temp}</p>
    <p>Humidity: ${data.main.humidity}</p>
    <p>Wind Speed: ${data.wind.speed} </p>
    `;
    }
});

