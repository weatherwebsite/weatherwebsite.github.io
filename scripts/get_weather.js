const weather = document.querySelector('.weather');
const citySearchButton = document.querySelector('button[role="citySearch"]');
const citySearchField = document.querySelector('input[type="citySearch"]');
const forecast = document.querySelector('.forecast');
const dateElement = document.querySelector('.dateElement');
const geolocateButtons = document.querySelectorAll('.geolocateButton');
const mainSection = document.querySelector('main')
main();

const icons = {
    '01d': 'bi-sun',
    '02d': 'bi-cloud',
    '03d': 'bi-cloud',
    '04d': 'bi-cloud',
    '09d': 'bi-cloud-rain-heavy',
    '10d': 'bi-cloud-rain',
    '11d': 'bi-cloud-lightning',
    '13d': 'bi-cloud-snow',
    '50d': 'bi-cloud-fog',
    '01n': 'bi-moon-fill',
    '02n': 'bi-cloud-moon-fill',
    '03n': 'bi-cloud-moon-fill',
    '04n': 'bi-cloud-moon-fill',
    '09n': 'bi-cloud-rain-heavy-fill',
    '10n': 'bi-cloud-rain-fill',
    '11n': 'bi-cloud-lightning-fill',
    '13n': 'bi-cloud-snow-fill',
    '50n': 'bi-cloud-fog-fill',
};

function printTodayDate() {
    const today = new Date();
    const options = {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    dateElement.insertAdjacentText('afterbegin', today.toLocaleString('ru-RU', options));
}

function getWeekDay(date) {
    const options = { weekday: 'long' };
    return date.toLocaleString('ru-RU', options);
}

function getForecast(url, callback=null) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let forecastInnerHtml = '';
            for (let i = 0; i < 30; i++) {
                forecastInnerHtml += `
                    <div class="col d-flex align-items-start">
                        <i class="bi bi-cloud text-body-secondary flex-shrink-0 me-3" width="5em" height="5em"></i>
                        <div>
                            <h3 class="fw-bold mb-0 fs-4 text-body-emphasis">${data.dt}</h3>
                            <p><span>${Math.floor(data.main.temp)}°C</span></p>
                            <p>${data.weather[0].main}</p>
                            <ul>
                                <li>Humidity <span>${data.main.humidity}%</span></li>
                                <li>Wind Speed <span>${data.wind.speed} m/s</span></li>
                            </ul>
                        </div>
                    </div>`;
            }
            forecast.innerHTML = forecastInnerHtml;
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            if (callback != null) {
                callback();
            }
        });
}

function getCityWeather(url, callback=null) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const markup = `<h1 class="location">${data.name}, ${data.sys.country}</h1>
                <div class="weather__summary">
                <i style="font-size: 3rem;" class="bi ${icons[data.weather[0].icon]}"></i>
                <p><span>${Math.floor(data.main.temp)}°C</span></p>
                <p>${data.weather[0].description}</p>
                <ul>
                <li>Humidity <span>${data.main.humidity}%</span></li>
                <li>Wind Speed <span>${data.wind.speed} m/s</span></li>
                </ul>
                </div>`;
            weather.insertAdjacentHTML('beforeend', markup);
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            if (callback != null) {
                callback();
            }
        });
}

function getWeatherByCoordinates(latitude, longitude, callback=null) {
    getCityWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3a066e5e5376713c0346d9d9ab984004&units=metric&lang=ru`, callback);
}

function getForecastByCoordinates(latitude, longitude, callback=null) {
    getForecast(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=3a066e5e5376713c0346d9d9ab984004&units=metric&lang=ru`, callback);
}

function getWeatherByCity(city, callback=null) {
    getCityWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a066e5e5376713c0346d9d9ab984004&units=metric&lang=ru`, callback);
}

function getForecastByCity(city, callback=null) {
    getForecast(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a066e5e5376713c0346d9d9ab984004&units=metric&lang=ru`, callback);
}

function geosuccess(position) {
    const { latitude, longitude } = position.coords;
    getWeatherByCoordinates(latitude, longitude);
    getForecastByCoordinates(latitude, longitude);
}

function main() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const city = urlParams.get('city');
    
    showMain = () => {mainSection.style.visibility = 'visible';};
    if (city != null) {
        getWeatherByCity(city, showMain);
        getForecastByCity(citySearchField.value, showMain);
    } else {
        showMain()
    }
    
    printTodayDate();
    
    citySearchButton.addEventListener('click', (e) => {
        e.preventDefault();
        getWeatherByCity(citySearchField.value);
        getForecastByCity(citySearchField.value);
    });

    geolocateButtons.forEach((button) => {
        button.onclick = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(geosuccess);
            }
            else {
                alert('Your browser does not support geolocatio');
            }
        };
    });
}
