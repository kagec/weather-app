import { WeatherState } from "../reducer/weatherReducer";

export type WeatherAction = ReturnType<typeof saveWeatherData>;

export const WEATHER_ACTION_TYPE = {
  SAVE_WEATHER_DATA: "SAVE_WEATHER_DATA",
} as const;

export const saveWeatherData = (weatherData: WeatherState) => ({
  type: WEATHER_ACTION_TYPE.SAVE_WEATHER_DATA,
  payload: weatherData,
});
