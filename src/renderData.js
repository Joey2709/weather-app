import {
  createWeather,
  renderDataForecast,
  renderDefaultDataWeather,
} from "./index";
import fromUnixTime from "date-fns/fromUnixTime";
import getDay from "date-fns/getDay";
import getHours from "date-fns/getHours";

const inputText = document.getElementById("input-text");
const buttonDaily = document.getElementById("daily");
const buttonHourly = document.getElementById("hourly");

const KEY = "3266a09975e1c73c26832ea3e0084781";

async function getWeatherData() {
  try {
    const responseWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputText.value}&APPID=${KEY}`
    );
    const data = await responseWeather.json();

    createWeather(data);
    buttonHourly.addEventListener("click", () => {
      renderDefaultDataWeather(data);
    });

    buttonDaily.addEventListener("click", () => {
      renderDefaultDataWeather(data);
    });
  } catch (error) {
    console.log(error);
  }
}

async function getForecastData() {
  try {
    const responeForecast = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${inputText.value}&appid=${KEY}`
    );
    const dataForecast = await responeForecast.json();

    dataForecast.length == 0 ? errorText(true) : "";
    let dataFiltered = dataForecast.list
      .filter(
        (e) =>
          getDay(fromUnixTime(e.dt)) !==
          getDay(fromUnixTime(dataForecast.list[0].dt))
      )
      .filter((element) => getHours(fromUnixTime(element.dt)) === 10);

    renderDataForecast(
      dataFiltered,
      dataFiltered[0].dt,
      dataFiltered.at(-1).dt
    );

    buttonHourly.addEventListener("click", () => {
      renderDataForecast(
        dataForecast.list,
        dataForecast.list[0].dt,
        dataForecast.list.at(-1).dt
      );
    });

    buttonDaily.addEventListener("click", () => {
      renderDataForecast(
        dataFiltered,
        dataFiltered[0].dt,
        dataFiltered.at(-1).dt
      );
    });
  } catch (error) {
    console.log(error);
  }
}

export { getWeatherData, getForecastData };
