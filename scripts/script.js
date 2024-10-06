var apiKey = "41cc09730c7e25c690813c76d9c70ad4";
var url =  "https://api.openweathermap.org/data/2.5/weather?appid="+ apiKey +"&units=metric&";

const searchBtn = document.getElementById("searchBtn");
const cityName = document.getElementById("cityName");
const weatherVal = document.getElementById("weatherVal");
const feelsLikeVal = document.getElementById("feelsLikeVal");
const windVal = document.getElementById("windVal");
const humidityVal = document.getElementById("humidityVal");
const visibilityVal = document.getElementById("visibilityVal");
const pressureVal = document.getElementById("pressureVal");
const sunriseVal = document.getElementById("sunriseVal");
const overlay = document.getElementsByClassName("overlay")[0];
const loading = document.getElementsByClassName("loading")[0];
const weatherIcon = document.getElementById("weatherIcon");
const weatherText = document.getElementById("weatherText");

async function getWeatherData(){
    overlay.style.display = "flex";
    loading.style.animation = "loading 1.5s steps(16) infinite";
    let city = cityName.value;
        fetch(url+"q="+city)
        .catch(err => {
            overlay.style.display = "none";
            loading.style.animation = "none";
            printVoidData();
        })
        .then(response => response.json())
        .then(data => {
            getData(data);
            cityName.value = city.toUpperCase();
            overlay.style.display = "none";
            loading.style.animation = "none";
        })
        .catch(err => {
            overlay.style.display = "none";
            loading.style.animation = "none";
            printVoidData();
        });
}
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(showLocation);
}
function showLocation(position){
    alert(position.coords.latitude + " " + position.coords.longitude);
    console.log(position);
    fetch(url+"lat="+position.coords.latitude+"&lon="+position.coords.longitude)
        .then(result => result.json())
        .then(data=>{
            getData(data);
        })
}
function getData(data){
    const temperature = Math.floor(data.main.temp);
    const feelsLike = Math.floor(data.main.feels_like);
    const windSpeed = Math.floor(data.wind.speed);
    const humidity = Math.floor(data.main.humidity);
    const visibility = Math.floor(data.visibility / 1000);
    const pressure = Math.floor(data.main.pressure);
    const time = new Date(data.sys.sunrise * 1000);
    const timeString = time.getHours() + ":"+time.getMinutes();
    const weather = data.weather[0].main;
    const imageLocation = "./images/";
    weatherIcon.src = imageLocation + weather.toLowerCase() + ".png";
    weatherText.textContent = weather;
    weatherVal.textContent = temperature;
    feelsLikeVal.textContent = feelsLike;
    windVal.textContent = windSpeed;
    humidityVal.textContent = humidity;
    visibilityVal.textContent = visibility;
    pressureVal.textContent = pressure;
    sunriseVal.textContent = timeString;
    cityName.value = data.name;
    console.log(data);
}
function printVoidData(){
    weatherVal.textContent = "N/A";
    feelsLikeVal.textContent = "N/A";
    windVal.textContent = "N/A";
    humidityVal.textContent = "N/A";
    visibilityVal.textContent = "N/A";
    pressureVal.textContent = "N/A";
    sunriseVal.textContent = "N/A";
    cityName.value = data.name;
}


searchBtn.addEventListener('click',getWeatherData);
