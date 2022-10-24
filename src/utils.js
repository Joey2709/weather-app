import { createForecastHourly } from "./index";
import fromUnixTime from "date-fns/fromUnixTime";
import format from "date-fns/format";

const imgWeather = require.context(
  "./img/weather",
  true,
  /\.(png|svg|jpg|gif)$/
);

console.log(imgWeather);
function kelvinToCelcius(number) {
  return Math.floor(Math.ceil(Number(number) - 273.15));
}

function capitalize(str) {
  if (str == "") {
    return "";
  }
  return str
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(" ");
}

function getIcon(iconId) {
  let icons = {
    "01": "img/icons/01-clear-sky.png",
    "02": "img/icons/02-few-clouds.png",
    "03": "img/icons/03-scattered-clouds.png",
    "04": "img/icons/04-broken-clouds.png",
    "09": "img/icons/09-shower-rain.png",
    10: "img/icons/10-rain.png",
    11: "img/icons/11-thunderstorm.png",
    13: "img/icons/13-snow.png",
    50: "img/icons/50-mist.png",
  };
  let regex = /[0-9]{2}/g;
  return icons[iconId.match(regex)];
}

function setBackGround(value) {
  if (
    value == "Mist" ||
    value == "Smoke" ||
    value == "Haze" ||
    value == "Dust" ||
    value == "Fog" ||
    value == "Sand" ||
    value == "Dust" ||
    value == "Ash" ||
    value == "Squall" ||
    value == "Tornado"
  ) {
    return `url(img/weather/Atmosphere.jpeg)`;
  }

  return `url(img/weather/${value}.jpeg`;
}

function celsiusToFahrenheit(value) {
  let regex = /[0-9]{2,3}/g;
  let result = Number(value.match(regex));
  const buttonUnit = document.getElementById("unit");
  if (buttonUnit.textContent == "Display °C") {
    return `${(result * 9) / 5 + 32}°F`;
  }

  return `${Math.floor(Math.ceil(((result - 32) * 5) / 9))}°C`;
}

function displayDataUnit() {
  const buttonUnit = document.getElementById("unit");
  if (buttonUnit.textContent == "Display °F") {
    return (buttonUnit.textContent = "Display °C");
  }
  return (buttonUnit.textContent = "Display °F");
}

function renderDefaultDataWeather(data) {
  let center = document.getElementsByClassName("center");
  let right = document.getElementsByClassName("right");
  center[0].childNodes[1].childNodes[1].textContent = `Temp: ${kelvinToCelcius(
    data.main.temp
  )} °C`;
  center[0].childNodes[3].childNodes[1].textContent = `Temp max: ${kelvinToCelcius(
    data.main.temp_max
  )} °C`;
  center[0].childNodes[4].childNodes[1].textContent = `Temp min: ${kelvinToCelcius(
    data.main.temp_min
  )} °C`;
  right[0].childNodes[0].childNodes[1].textContent = `Feels like: ${kelvinToCelcius(
    data.main.feels_like
  )} °C`;
}

function renderDataForecast(data, date1, date2) {
  const forecast = document.getElementById("forecast");
  createForecastHourly(data);
  const firstDate = fromUnixTime(date1);
  const secondDate = fromUnixTime(date2);
  forecast.textContent = `Conditions from ${format(
    firstDate,
    "EEEE do, kk:mm"
  )} to ${format(secondDate, "EEEE do, kk:mm")}`;
}

function changeUnitForecast() {
  const dataForecast = document.getElementById("data-forecast");
  dataForecast.childNodes.forEach((element) => {
    element.childNodes[3].textContent = `Temp: ${celsiusToFahrenheit(
      element.childNodes[3].textContent
    )}`;
  });
}

export {
  kelvinToCelcius,
  capitalize,
  getIcon,
  setBackGround,
  celsiusToFahrenheit,
  displayDataUnit,
  renderDefaultDataWeather,
  changeUnitForecast,
  renderDataForecast,
};
