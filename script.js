const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const locationElement = document.getElementById('location');
const weatherDescElement = document.getElementById('weather-desc');
const weatherIconElement = document.getElementById('weather-icon');
const tempElement = document.getElementById('temp');
const forecastListElement = document.getElementById('forecast-list');
searchBtn.addEventListener('click', searchLocation);
function searchLocation() {
const location = searchInput.value.trim();
if (location) {
getWeatherData(location);
}
}
function getWeatherData(location) {
const apiUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
fetch(apiUrl)
.then(response => response.json())
.then(data => {
displayWeatherData(data);
getForecastData(data.coord);
})
.catch(error => console.error(error));
}
function displayWeatherData(data) {
const location = data.name;
const weatherDesc = data.weather[0].description;
const weatherIcon = data.weather[0].icon;
const temp = data.main.temp;
locationElement.textContent = location;
weatherDescElement.textContent = weatherDesc;
weatherIconElement.src = `https://openweathermap.org/img/w/${weatherIcon}.png`;
tempElement.textContent = `Temperature: ${temp}°C`;
}
function getForecastData(coords) {
const apiUrl =
`https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&units=metric
&appid=${apiKey}`;
fetch(apiUrl)
.then(response => response.json())
.then(data => {
displayForecastData(data.list);
})
.catch(error => console.error(error));
}
