const briefWeatherElements = document.querySelectorAll('.brief-weather')

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

function getBriefWeather(city, element) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3a066e5e5376713c0346d9d9ab984004&units=metric&lang=ru`
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            element.innerHTML = `<i class="bi ${icons[data.weather[0].icon]}" style="font-size: 1em;"></i> ${data.weather[0].description}, ${Math.floor(data.main.temp)}°C`;
        })
        .catch((error) => {
            console.log(error);
        });
}

function main() {
    briefWeatherElements.forEach(async (element) => {
        const city = element.getAttribute('city');
        getBriefWeather(city, element);
    });
}

main();