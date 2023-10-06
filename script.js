const apiKey = '';

const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=imperial&q=';
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon')
const savedCities = document.querySelector('.saved-city');
const favoriteCities = document.querySelector('.favorite');
const favoriteBtn = document.querySelector('button#save-icon')

async function checkWeather(city) {
    // const defaultCity = 'Dallas'
    const response = await fetch(apiURL + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector('.error').style.display = 'block'
        document.querySelector('.weather').style.display = 'none'
    } else {
        var data = await response.json();
    }

    document.querySelector('.city').innerHTML = data['name']
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°F'
    document.querySelector('.humidity').innerHTML = data.main.humidity + ' %'
    document.querySelector('.wind').innerHTML = data.wind.speed +' mph'

    if (data.weather[0].main == 'Clouds') weatherIcon.src = './images/clouds.png'
    else if (data.weather[0].main == 'Rain') weatherIcon.src = './images/rain.png'
    else if (data.weather[0].main == 'Snow') weatherIcon.src = './images/snow.png'
    else if (data.weather[0].main == 'Clear') weatherIcon.src = './images/clear.png'
    else if (data.weather[0].main == 'Drizzle') weatherIcon.src = './images/drizzle.png'
    else if (data.weather[0].main == 'Mist') weatherIcon.src = './images/mist.png'

    document.querySelector('.weather').style.display = 'block'
    document.querySelector('.error').style.display = 'none'
    console.log(data)
}

function addToList() {
    const addedCity = document.createElement('button')
    addedCity.innerHTML = document.querySelector('h2.city').innerHTML
    addedCity.id = 'added-city'
    const favoriteCitiesArray = Array.from(favoriteCities.children);
    if (favoriteCitiesArray.some(cityDiv => cityDiv.innerHTML === addedCity.innerHTML)) {
        alert('You already added this city')
    } else {
        if (favoriteCities.children.length < 3) {
            favoriteCities.appendChild(addedCity)
            // savedCities.style.display = 'block'
            saveCity()
        }
         else {
            alert('Can only add up to 3 cities at a time')
        }
    }
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value)
})

favoriteBtn.addEventListener('click', addToList)



function saveCity() {
    localStorage.setItem("data", favoriteCities.innerHTML)
    savedCities.style.display = 'block'
    localStorage.setItem("style", savedCities.style.display)
}

function showApp() {
    favoriteCities.innerHTML = localStorage.getItem("data")
    savedCities.style.display = localStorage.getItem("style")
    checkWeather('Dallas')
}

showApp()

document.addEventListener('click', (e) => {
    if (e.target.matches('button#added-city')) {
        checkWeather(e.target.innerHTML)
    }
});
