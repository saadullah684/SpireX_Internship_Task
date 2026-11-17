const API_KEY = "594dbd120ec7fc50ea13623d8040f0df";

const currentDate = new Date();

document.querySelector("#date").textContent =
    currentDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long"
    });

// ELEMENTS

const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const cityName = document.querySelector("#cityName");
const countryName = document.querySelector("#countryName");
const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const feelsLike = document.querySelector("#feelsLike");
const forecastContainer =
    document.querySelector("#forecastContainer");

// GET WEATHER BY CITY

async function getWeather(city) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);
    
        // CURRENT WEATHER

        cityName.textContent = data.name;

        countryName.textContent = data.sys.country;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        condition.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${Math.round(data.wind.speed * 3.6)} km/h`;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        // GET 7 DAY FORECAST
    
        const lat = data.coord.lat;
        const lon = data.coord.lon;
        getForecast(lat, lon);

    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

// GET WEATHER BY LOCATION

async function getWeatherByLocation(lat, lon) {

    const url =
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to get current weather");
        }

        const data = await response.json();

        console.log("Location Weather:", data);

        // CURRENT WEATHER    

        cityName.textContent = data.name;

        countryName.textContent = data.sys.country;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        condition.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${Math.round(data.wind.speed * 3.6)} km/h`;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        // 7 DAY FORECAST    

        getForecast(lat, lon);

    } catch (error) {
        console.log(error);
        // If location weather fails
        // use Karachi as fallback
        getWeather("Karachi");
    }
}

// GET USER LOCATION
function getUserLocation() {
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported.");
        getWeather("Karachi");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            console.log("Latitude:", lat);
            console.log("Longitude:", lon);
            getWeatherByLocation(lat, lon);

        },
        function (error) {
            console.log("Location permission denied.");
            // Fallback city
            getWeather("Karachi");
        }
    );
}

// GET 7 DAY FORECAST

async function getForecast(lat, lon) {

    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=7&timezone=auto`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Forecast data not found");
        }
        const data = await response.json();
        console.log("Forecast:", data);
        displayForecast(data.daily);

    } catch (error) {
        console.log(error);
        forecastContainer.innerHTML =
            "<p>Unable to load forecast.</p>";
    }
}

// DISPLAY FORECAST

function displayForecast(daily) {

    forecastContainer.innerHTML = "";

    for (let i = 0; i < daily.time.length; i++) {
        const date =
            new Date(daily.time[i]);

        const dayName =
            date.toLocaleDateString("en-US", {
                weekday: "long"
            });

        const maxTemp =
            Math.round(
                daily.temperature_2m_max[i]
            );

        const minTemp =
            Math.round(
                daily.temperature_2m_min[i]
            );

        const weather =
            getWeatherInfo(
                daily.weather_code[i]
            );

        const card =
            document.createElement("div");

        card.classList.add("forecast-card");
        card.innerHTML = `
            <p>${dayName}</p>
            <span>${weather.icon}</span>
            <h3>${maxTemp}°C</h3>
            <p>${weather.description}</p>
            <small>Min: ${minTemp}°C</small>
        `;
        forecastContainer.appendChild(card);
    }
}

// WEATHER CODE
function getWeatherInfo(code) {
    if (code === 0) {
        return {
            icon: "☀️",
            description: "Clear Sky"
        };
    }
    if (code >= 1 && code <= 3) {
        return {
            icon: "🌤️",
            description: "Partly Cloudy"
        };
    }
    if (code === 45 || code === 48) {
        return {
            icon: "🌫️",
            description: "Fog"
        };
    }
    if (code >= 51 && code <= 57) {
        return {
            icon: "🌦️",
            description: "Drizzle"
        };
    }
    if (code >= 61 && code <= 67) {
        return {
            icon: "🌧️",
            description: "Rain"
        };
    }
    if (code >= 71 && code <= 77) {
        return {
            icon: "❄️",
            description: "Snow"
        };
    }
    if (code >= 80 && code <= 82) {
        return {
            icon: "🌧️",
            description: "Rain Showers"
        };
    }
    if (code >= 85 && code <= 86) {
        return {
            icon: "🌨️",
            description: "Snow Showers"
        };
    }
    if (code >= 95) {
        return {
            icon: "⛈️",
            description: "Thunderstorm"
        };
    }
    return {
        icon: "🌤️",
        description: "Unknown"
    };
}

// SEARCH BUTTON

searchBtn.addEventListener("click", function () {

    const city =
        cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);
});

// ENTER KEY

cityInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }
});
getUserLocation();