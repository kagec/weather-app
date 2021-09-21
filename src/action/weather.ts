import { ConsolidatedWeather } from "../components/WeatherApp";

export const WEATHER_ACTION_TYPE = {
  SAVE_WEATHER_DATA: "SAVE_WEATHER_DATA",
} as const;

export const saveWeatherData = (weatherData: ConsolidatedWeather) => ({
  type: WEATHER_ACTION_TYPE.SAVE_WEATHER_DATA,
  payload: weatherData,
});
