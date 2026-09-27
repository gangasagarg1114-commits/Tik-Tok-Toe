const cityInput = document.querySelector("#cityInput");
const searchBtn = document.querySelector("#searchBtn");
const locationEl = document.querySelector("#location");
const weatherIcon = document.querySelector("#weatherIcon");
const tempEl = document.querySelector("#temperature");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");
const weatherEl = document.querySelector("#weather");
const loadingEl = document.querySelector("#loading");
const day1 = document.querySelector("#day1");
const day2 = document.querySelector("#day2");
const day3 = document.querySelector("#day3");
const day4 = document.querySelector("#day4");
const day5 = document.querySelector("#day5");

searchBtn.addEventListener("click", function () {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    };

    getWeather(city);
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${encodeURIComponent(city)}&appid=2e68e17b919eba4c435541cc233b4844`;
    loadingEl.innerText = "Loading...";

    localStorage.setItem("lastCity", city);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        };

        const data = await response.json();

        console.log(data);

        const condition = data.weather[0].main;
        changeBackground(condition);

        if (condition === "Clouds") {
            weatherIcon.src = "images/cloudy.png";
        } else if (condition === "Clear") {
            weatherIcon.src = "images/sun.png";
        } else if (condition === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (condition === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        } else if (condition === "Snow") {
            weatherIcon.src = "images/snow.png";
        } else if (condition === "Thunderstorm") {
            weatherIcon.src = "images/thunderstorm.png";
        } else if (condition === "Mist") {
            weatherIcon.src = "images/mist.png";
        };

        weatherEl.innerText = data.weather[0].description;
        tempEl.innerText = `${Math.round(data.main.temp)}°C`;
        windEl.innerHTML = `💨 ${data.wind.speed} m/s`;
        locationEl.innerText = data.name;
        humidityEl.innerHTML = `💧 ${data.main.humidity}%`;
    } catch (error) {
        alert(error.message);
    }

    finally {
        loadingEl.innerText = "";
    };

    const link = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=2e68e17b919eba4c435541cc233b4844&units=metric`;
    const response2 = await fetch(link);
    const forecast = await response2.json();

    const days = [day1, day2, day3, day4, day5];

    for (let i = 0; i < 5; i++) {

        const item = forecast.list[i * 8];

        days[i].innerHTML = `
        <h4>${item.dt_txt.split(" ")[0]}</h4>
        <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}.png">
        <p>${Math.round(item.main.temp)}°C</p>
        <small>${item.weather[0].main}</small>
    `;
    }



};

cityInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

const lastCity = localStorage.getItem("lastCity");


if (lastCity) {
    cityInput.value = lastCity;
    getWeather(lastCity);
};


function changeBackground(condition) {
    document.body.className = "";

    if (condition === "Clear") {
        document.body.classList.add("sunny");
    }

    else if (condition === "Clouds") {
        document.body.classList.add("cloudy");
    }

    else if (condition === "Rain" || condition === "Drizzle") {
        document.body.classList.add("rainy");
    }

    else if (condition === "Thunderstorm") {
        document.body.classList.add("storm");
    }

    else if (condition === "Snow") {
        document.body.classList.add("snow");
    }

};







