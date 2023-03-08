// # =============> HTML Elements <=============
let currentDay = document.getElementById('currentDay');
let nextDay = document.getElementById('nextDay');
let thirdDay = document.getElementById('thirdDay');
let input = document.querySelector('input');
let parentElement = document.querySelector('.parentElement');



// ! =============> Js Variables <=============
let daysArr = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wensday',
    'Thursday',
    'Friday',
    'Saturday',
]

let monthArr = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

let testCountryNameRegex = /^\w{3,}(\s\w+)*$/;

// + =============> Fetching the api Function <=============
async function getApi(country) {
    let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=013432c645f64b3a86e91200230503&q=${country}&days=3`);
    let result = await response.json();
    displayCurrentDay(result);
    displayNextDay(result);
    displayThirdDay(result);
}

function displayCurrentDay(currentDayArr) {
    let content = '';
    content = `
    <div class="contentBx rounded-3">
        <div class="text-white-50 py-2 px-3 top-content d-flex justify-content-between">
            <span>${
        daysArr[new Date(currentDayArr.forecast.forecastday[0].date).getDay()]
    }</span>
            <span>${currentDayArr.forecast.forecastday[0].date}</span>
        </div>
        <div class="middle-content px-5 pt-4">
            <h3 class="mt-2 text-white">${
        currentDayArr.location.name
    }</h3>
            <div class="middle-center d-flex justify-content-between align-items-center">
                <p class="degree my-1 text-white">
                    ${
        currentDayArr.current.temp_c
    }<sup>o</sup>C
                </p>
                <img src="${
        currentDayArr.current.condition.icon
    }" />
            </div>
            <p class="custom">${
        currentDayArr.current.condition.text
    }</p>
        </div>
        <div class="bottom-content px-4 py-2">
            <span class="text-white-50 me-3"> <i class="fa-solid fa-umbrella"> ${
        currentDayArr.current.humidity
    }%</i> </span>
            <span class="text-white-50 me-3"><i class="fa-solid fa-wind"></i> 18km/h</span>
            <span class="text-white-50 me-3"><i class="fa-solid fa-compass"></i> ${
        currentDayArr.current.wind_dir
    }</span>
        </div>
    </div>
    `
    currentDay.innerHTML = content;
}

function displayNextDay(nextDayArr) {
    let content = '';
    content = `
        <div class="contentBx rounded-3 py-1">
            <div class="text-white-50 py-2 px-3 top-content d-flex justify-content-center">
                <span>${
        daysArr[new Date(nextDayArr.forecast.forecastday[1].date).getDay()]
    }</span>
            </div>
            <div class="middle-content px-4 pt-4 text-center">
                <img class="m-0" src = "${nextDayArr.forecast.forecastday[1].day.condition.icon}" />
                <div class="py-3 middle-center d-flex justify-content-center align-items-center">
                    <p class="degree my-1 text-white m-0">
                        ${nextDayArr.forecast.forecastday[1].day.avgtemp_c}<sup>o</sup>C
                    </p>
                </div>
                <p class="custom m-0">${nextDayArr.forecast.forecastday[1].day.condition.text}</p>
            </div>
        </div>
    `
    nextDay.innerHTML = content;
}

function displayThirdDay(thirdDayArr) {
    let content = '';
    content = `
        <div class="contentBx rounded-3 py-1">
            <div class="text-white-50 py-2 px-3 top-content d-flex justify-content-center">
                <span>${
        daysArr[new Date(thirdDayArr.forecast.forecastday[2].date).getDay()]
    }</span>
            </div>
            <div class="middle-content px-4 pt-4 text-center">
                <img class="m-0" src = "${thirdDayArr.forecast.forecastday[2].day.condition.icon}" />
                <div class="py-3 middle-center d-flex justify-content-center align-items-center">
                    <p class="degree my-1 text-white m-0">
                        ${thirdDayArr.forecast.forecastday[2].day.avgtemp_c}<sup>o</sup>C
                    </p>
                </div>
                <p class="custom m-0">${thirdDayArr.forecast.forecastday[2].day.condition.text}</p>
            </div>
        </div>
    `

    thirdDay.innerHTML = content;
}

async function getImage(country) {
    let response = await fetch(`https://pixabay.com/api/?key=34151716-f290a2560fe2cabe085079335&q=${country}&image_type=photo`)
    let result = await response.json();
    parentElement.style.backgroundImage = `url(${
        result.hits[0].largeImageURL
    })`;
}

input.addEventListener('input', async function () {
    if (testCountryNameRegex.test(this.value)) {
        getApi(this.value);
        getImage(this.value)
    }
})
