const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let todayDate = new Date();
let currentDate = todayDate.getDate();
let currentDayIndex = todayDate.getDay();
let currentMonthIndex = todayDate.getMonth();

const forecast = document.getElementById("forecast");
const LocationInput = document.getElementById("LocationInput");
const LocationBtn = document.getElementById("LocationBtn");

async function getWeatherData(place) {
    let apiData;
    apiData = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=eda765e609d24f2abd5155055241101&q=${place}&days=3`);
    if (apiData.status != 400 && apiData.ok === true) {
        let wData = await apiData.json();
        await displayCurrent(wData.location, wData.current);
        displayNext(wData.forecast.forecastday);
    }
}

async function getLocation() {
    let apiData = await fetch(`https://apiip.net/api/check?accessKey=fc6ac94c-d5eb-4c49-b301-53fd60497e4c`);
    let LData = await apiData.json();
    getWeatherData(LData.countryName);
}

LocationInput.addEventListener("keyup", function () {
    getWeatherData(LocationInput.value);
})
LocationBtn.addEventListener("click", function () {
    getWeatherData(LocationBtn.value);
})


function displayCurrent(place, current) {

    if (current !== null) {
        let box = `
   <div class="col-md-4">
    <div class="card position-relative text-center bg-dark overflow-hidden">
    <div class="day-label d-flex justify-content-between align-items-center text-white p-3 ">
        <span>${days[currentDayIndex]}</span>
        <span>Today</span>
        <span>${currentDate + " " + months[currentMonthIndex]}</span>
    </div>
    <div class="forecast-img position-relative">
        <img src="./images/weathers/${current.condition.text}.jpg" class="card-img-top" height="465px" alt="weather image">
        <div class="card-body">
            <h1 class="card-title">${place.name}</h1>
            <div class="degree-text d-flex justify-content-between">
                <div class="d-flex">
                    <span>${current.temp_c}</span>
                    <sup>o</sup>
                    <span>C</span>
                </div>
                <img src="https:${current.condition.icon}" width="30%" alt="">
            </div>
            <h5 style="text-align: left;" class="ms-2">${current.condition.text}</h5>
        </div>
    </div>
    <div class="deg-info-group d-flex justify-content-between align-items-center glassy">
        <p><i class="fa-solid fa-umbrella"></i><span>${current.humidity}%</span></p>
        <p><i class="fa-solid fa-wind"></i><span>${current.wind_kph}km/h</span></p>
        <p><i class="fa-regular fa-compass"></i><span>${current.wind_dir}</span></p>
    </div>
</div>
</div>
    `;

        forecast.innerHTML = box;

    }
}

function displayNext(dayWeather) {
    let box = '';

    for (let i = 1; i < dayWeather.length; i++) {
        box += `
        <div class="col-md-4">
        <div class="card next-days position-relative text-center bg-dark overflow-hidden">
            <div class="day-label d-flex justify-content-center align-items-center text-white p-3 ">
                <span>${days[currentDayIndex + i]}</span>
            </div>
            <div class="forecast-img position-relative">
                <img src="./images/weathers/${dayWeather[i].day.condition.text}.jpg" class="card-img-top" height="465px" alt="weather image">
                <div class="card-body">
                    <img src="https:${dayWeather[i].day.condition.icon}" width="48" alt="">
                    <div class="fs-1 max-degree d-flex justify-content-center">
                        <span>${dayWeather[i].day.maxtemp_c}</span>
                        <sup>o</sup>
                        <span>C</span>
                    </div>
                    <div class="fs-5 min-degree d-flex justify-content-center mb-lg-5">
                        <span>${dayWeather[i].day.mintemp_c}</span>
                        <sup>o</sup>
                        <span>C</span>
                    </div>
                    <h5>${dayWeather[i].day.condition.text}</h5>
                </div>
            </div>
        </div>
        </div>
        `
    }

    forecast.innerHTML += box;

}

getLocation();

