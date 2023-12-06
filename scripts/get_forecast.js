const mainSection = document.querySelector('main');
const weather = document.querySelector('.weather');
const forecast = document.querySelector('.forecast');
const citySearchButton = document.querySelector('button[role="city-search"]');
const citySearchField = document.querySelector('input[type="city-search"]');
const geolocateButtons = document.querySelectorAll('.geolocateButton');

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

function getWeekDay(date) {
    const options = { weekday: 'long' };
    return date.toLocaleString('ru-RU', options);
}

function getForecast(url, callback=null) {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            let forecastInnerHtml = '<h2 class="pb-2 border-bottom">Прогноз на 30 дней</h2>';
            var iconKeys = Object.keys(icons);
            const day = new Date();
            const options = {
                month: 'long', day: 'numeric',
            };
            for (let i = 0; i < 30; i++) {
                day.setDate(day.getDate() + 1);
                forecastInnerHtml += `
                    <div class="card my-4">
                        <div class="forecast-card-body row g-4 py-5">
                            <div class="col-12 text-center my-5">
                                <h3 class="fw-bold mb-2 fs-4 text-body-emphasis">${day.toLocaleString('ru-RU', options)}</h3>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-3 text-center">
                                <h4>День</h4>
                                <i class="bi ${icons[iconKeys[iconKeys.length * Math.random() << 0]]}" style="font-size: 5em;"></i>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-3 text-center text-sm-start ps-sm-5 ps-md-0">
                                <div>Температура: <span><b>${Math.floor(data.main.temp)}°C</b></span></div>
                                <div>Описание: <span><b>${data.weather[0].description}</b></span></div>
                                <div>Скорость ветра: <span>${data.wind.speed} м/с</span></div>
                                <div>Давление: <span>${Math.floor(0.750062 * data.main.pressure)} мм рт. ст.</span></div>
                                <div>Влажность: <span>${data.main.humidity}%</span></div>
                                <div>Ощущается как: <span>${Math.floor(data.main.feels_like)}°C</span></div>
                                <div>Видимость: <span>${data.visibility} м</span></div>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-3 text-center">
                                <h4>Ночь</h4>
                                <i class="bi ${icons[iconKeys[iconKeys.length * Math.random() << 0]]}" style="font-size: 5em;"></i>
                            </div>
                            <div class="col-sm-12 col-md-6 col-lg-3 text-center text-sm-start ps-sm-5 ps-md-0">
                                <div>Температура: <span><b>${Math.floor(data.main.temp)}°C</b></span></div>
                                <div>Описание: <span><b>${data.weather[0].description}</b></span></div>
                                <div>Скорость ветра: <span>${data.wind.speed} м/с</span></div>
                                <div>Давление: <span>${Math.floor(0.750062 * data.main.pressure)} мм рт. ст.</span></div>
                                <div>Влажность: <span>${data.main.humidity}%</span></div>
                                <div>Ощущается как: <span>${Math.floor(data.main.feels_like)}°C</span></div>
                                <div>Видимость: <span>${data.visibility} м</span></div>
                            </div>
                        </div>
                    </div>
                    `;
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
            const today = new Date();
            const options = {
                month: 'long', day: 'numeric',
            };
            const weatherInnerHtml = `
                <div class="current-weather-card" id="head-scroll">
                    <div class="current-weather-header row">
                        <div class="current-weather-date-time col-lg-6">
                            <div class="current-weather-city h2">${data.name}</div>
                            <div class="current-weather-day">${getWeekDay(today)}</div>
                            <div class="current-weather-date">${today.toLocaleString('ru-RU', options)}</div>
                            <div class="current-weather-time">${today.toLocaleTimeString('ru-RU', { hour: "numeric", minute: "numeric"})}</div>
                        </div>
                        <div class="col-lg-6 text-lg-end">
                            <p class="lead">${data.weather[0].description}</p>
                            <i class="bi ${icons[data.weather[0].icon]}" style="font-size: 8em;"></i>
                        </div>
                    </div>
                    <div class="current-weather-info row">
                        <div class="current-weather-temperature col-12 h1 mb-3">${Math.floor(data.main.temp)}°C</div>
                    </div>
                    <div class="current-weather-details row">
                        <div class="current-weather-detail col-md-6 col-lg-4">Скорость ветра: <span>${data.wind.speed} м/с</span></div>
                        <div class="current-weather-detail col-md-6 col-lg-4">Давление: <span>${Math.floor(0.750062 * data.main.pressure)} мм рт. ст.</span></div>
                        <div class="current-weather-detail col-md-6 col-lg-4">Влажность: <span>${data.main.humidity}%</span></div>
                        <div class="current-weather-detail col-md-6 col-lg-4">Ощущается как: <span>${Math.floor(data.main.feels_like)}°C</span></div>
                        <div class="current-weather-detail col-md-6 col-lg-4">Видимость: <span>${data.visibility} м</span></div>
                    </div>
                </div>
                `;
            weather.innerHTML = weatherInnerHtml;
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
    let city = urlParams.get('city');
    
    if (city == null) {
        city = "Москва";
    }

    showMain = () => {mainSection.style.visibility = 'visible';};
    getWeatherByCity(city, showMain);
    getForecastByCity(city, showMain);

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

main();
