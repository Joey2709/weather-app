import "./style.css";
import "./img/default.jpeg";
import {
  kelvinToCelcius,
  capitalize,
  getIcon,
  setBackGround,
  celsiusToFahrenheit,
  displayDataUnit,
  renderDefaultDataWeather,
  changeUnitForecast,
  renderDataForecast,
} from "./utils";
import { getWeatherData, getForecastData } from "./renderData";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

const app = document.getElementById("app");
const search = document.getElementById("search");
const buttonUnit = document.getElementById("unit");
const buttonDaily = document.getElementById("daily");
const buttonHourly = document.getElementById("hourly");
const mainForecast = document.getElementById("data-forecast");
const inputSerach = document.getElementById("input-text");
const weatherContainer = document.getElementById("weather");

validateButtons();

search.addEventListener("click", getWeatherData);
search.addEventListener("click", getForecastData);
search.addEventListener("click", validateButtons);

buttonUnit.addEventListener("click", displayDataUnit);
buttonUnit.addEventListener("click", changeUnitForecast);
buttonUnit.addEventListener("click", () => {
  let center = document.getElementsByClassName("center");
  let right = document.getElementsByClassName("right");
  center[0].childNodes[1].childNodes[1].textContent = `Temp: ${celsiusToFahrenheit(
    center[0].childNodes[1].childNodes[1].textContent
  )}`;
  center[0].childNodes[3].childNodes[1].textContent = `Temp max: ${celsiusToFahrenheit(
    center[0].childNodes[3].childNodes[1].textContent
  )}`;
  center[0].childNodes[4].childNodes[1].textContent = `Temp min: ${celsiusToFahrenheit(
    center[0].childNodes[4].childNodes[1].textContent
  )}`;
  right[0].childNodes[0].childNodes[1].textContent = `Feels like: ${celsiusToFahrenheit(
    right[0].childNodes[0].childNodes[1].textContent
  )}`;
});
inputSerach.addEventListener("keyup", () => {
  if (inputSerach.value.length == 0) {
    validateButtons();
    app.style.backgroundImage = "url(img/default.jpeg)";
    return;
  }
});

function validateButtons() {
  const forecast = document.getElementById("forecast");
  const dataForecast = document.getElementById("data-forecast");
  const buttonsDate = document.getElementById("buttons-date");
  if (inputSerach.value.length > 0) {
    buttonUnit.style.display = "flex";
    buttonDaily.style.display = "flex";
    buttonHourly.style.display = "flex";
    weatherContainer.style.display = "flex";
    if (window.matchMedia("(max-width: 576px)").matches) {
      buttonsDate.style.height = "50vh";
    }
    return;
  }
  buttonUnit.style.display = "none";
  buttonDaily.style.display = "none";
  buttonHourly.style.display = "none";
  weatherContainer.style.display = "none";
  forecast.innerHTML = "";
  dataForecast.innerHTML = "";
  app.style.backgroundImage = "url(img/default.jpeg)";
  if (window.matchMedia("(max-width: 576px)").matches) {
    buttonsDate.style.height = "100vh";
  }
  return;
}

function createWeather(data) {
  weatherContainer.innerHTML = "";

  const center = document.createElement("div");
  const right = document.createElement("div");

  /*Center Elements*/
  const locationContainer = document.createElement("div");
  const tempContainer = document.createElement("div");
  const descriptionContainer = document.createElement("div");
  const tempMaxContainer = document.createElement("div");
  const tempMinContainer = document.createElement("div");

  const location = document.createElement("p");
  const temp = document.createElement("p");
  const description = document.createElement("p");
  const tempMax = document.createElement("p");
  const tempMin = document.createElement("p");

  const locationIcon = document.createElement("img");
  const tempIcon = document.createElement("img");
  const descriptionIcon = document.createElement("img");
  const tempMaxIcon = document.createElement("img");
  const tempMinIcon = document.createElement("img");

  /*Right Elements*/
  const feelsLikeContainer = document.createElement("div");
  const humidityContainer = document.createElement("div");
  const pressureContainer = document.createElement("div");
  const windSpeedContainer = document.createElement("div");

  const feelsLike = document.createElement("p");
  const humidity = document.createElement("p");
  const pressure = document.createElement("p");
  const windSpeed = document.createElement("p");

  const feelsLikeIcon = document.createElement("img");
  const humidityIcon = document.createElement("img");
  const pressureIcon = document.createElement("img");
  const windSpeedIcon = document.createElement("img");

  /*Appenchilds*/
  weatherContainer.appendChild(center).classList.add("center");
  weatherContainer.appendChild(right).classList.add("right");

  center.appendChild(locationContainer);
  center.appendChild(tempContainer);
  center.appendChild(descriptionContainer);
  center.appendChild(tempMaxContainer);
  center.appendChild(tempMinContainer);

  locationContainer.appendChild(locationIcon);
  locationContainer.appendChild(location);
  tempContainer.appendChild(tempIcon);
  tempContainer.appendChild(temp);
  descriptionContainer.appendChild(descriptionIcon);
  descriptionContainer.appendChild(description);
  tempMaxContainer.appendChild(tempMaxIcon);
  tempMaxContainer.appendChild(tempMax);
  tempMinContainer.appendChild(tempMinIcon);
  tempMinContainer.appendChild(tempMin);

  right.appendChild(feelsLikeContainer);
  right.appendChild(humidityContainer);
  right.appendChild(pressureContainer);
  right.appendChild(windSpeedContainer);

  feelsLikeContainer.appendChild(feelsLikeIcon);
  feelsLikeContainer.appendChild(feelsLike);
  humidityContainer.appendChild(humidityIcon);
  humidityContainer.appendChild(humidity);
  pressureContainer.appendChild(pressureIcon);
  pressureContainer.appendChild(pressure);
  windSpeedContainer.appendChild(windSpeedIcon);
  windSpeedContainer.appendChild(windSpeed);

  /* Set values */
  buttonUnit.textContent = "Display °F";
  app.style.backgroundImage = setBackGround(data.weather[0].main);

  location.textContent = `Location: ${data.name}`;
  locationIcon.src = "img/icons/location.png";
  temp.textContent = `Temp: ${kelvinToCelcius(data.main.temp)} °C`;
  tempIcon.src = "img/icons/feels-like.png";
  description.textContent = capitalize(data.weather[0].description);
  descriptionIcon.src = getIcon(data.weather[0].icon);
  tempMax.textContent = `Temp max: ${kelvinToCelcius(data.main.temp_max)} °C`;
  tempMaxIcon.src = "img/icons/feels-like.png";
  tempMin.textContent = `Temp min: ${kelvinToCelcius(data.main.temp_min)} °C`;
  tempMinIcon.src = "img/icons/feels-like.png";
  feelsLike.textContent = `Feels like: ${kelvinToCelcius(
    data.main.feels_like
  )} °C`;
  feelsLikeIcon.src = "img/icons/feels-like.png";
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  humidityIcon.src = "img/icons/humidity.png";
  pressure.textContent = `Pressure: ${data.main.pressure} hPa`;
  pressureIcon.src = "img/icons/pressure.png";
  windSpeed.textContent = `Wind speed: ${data.wind.speed} m/s`;
  windSpeedIcon.src = "img/icons/wind-speed.png";
}

function createForecastHourly(data) {
  mainForecast.innerHTML = "";
  const fragment = new DocumentFragment();

  for (const item of data) {
    const forecastContainer = document.createElement("div");
    const dayText = document.createElement("h2");
    const timeText = document.createElement("h3");
    const weatherTimeText = document.createElement("p");
    const weatherTempText = document.createElement("p");
    const weatherIcon = document.createElement("img");

    const result = fromUnixTime(item.dt);

    fragment.appendChild(forecastContainer).classList.add("forecast-item");
    forecastContainer.appendChild(dayText);
    forecastContainer.appendChild(timeText);
    forecastContainer.appendChild(weatherTimeText);
    forecastContainer.appendChild(weatherTempText);
    forecastContainer.appendChild(weatherIcon);

    dayText.textContent = format(result, "do EEEE");
    timeText.textContent = format(result, "kk:mm");
    weatherTimeText.textContent = item.weather[0].description;
    weatherTempText.textContent = `${kelvinToCelcius(item.main.temp)} °C`;
    weatherIcon.src = getIcon(item.weather[0].icon);
  }
  buttonUnit.textContent = "Display °F";
  mainForecast.appendChild(fragment);
}

const time = document.getElementById("time");
const date = document.getElementById("date");
setInterval(() => {
  let actualDate = new Date();
  time.textContent = format(actualDate, "kk:mm:ss");
  date.textContent = format(actualDate, "eeee, MMMM dd, yyyy");
}, 1000);

export {
  createWeather,
  createForecastHourly,
  renderDataForecast,
  renderDefaultDataWeather,
  validateButtons,
};
