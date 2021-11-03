import type { ConsolidatedWeather, Location } from "../components/WeatherApp";

export type EntitiesAction =
  | ReturnType<typeof saveLocationData>
  | ReturnType<typeof saveWeatherData>
  | ReturnType<typeof selectCurrentWoeid>;

export const ENTITIES_ACTION_TYPE = {
  SAVE_LOCATION_DATA: "SAVE_LOCATION_DATA",
  SAVE_WEATHER_DATA: "SAVE_WEATHER_DATA:",
  SELECT_CURRENT_WOEID: "SELECT_CURRENT_WOEID",
} as const;

export const saveLocationData = (locationData: Location) => ({
  type: ENTITIES_ACTION_TYPE.SAVE_LOCATION_DATA,
  payload: locationData,
});

export const saveWeatherData = (
  weatherData: ConsolidatedWeather,
  woeid: number
) => ({
  type: ENTITIES_ACTION_TYPE.SAVE_WEATHER_DATA,
  payload: { weatherData, woeid },
});

export const selectCurrentWoeid = (woeid: number) => ({
  type: ENTITIES_ACTION_TYPE.SELECT_CURRENT_WOEID,
  payload: woeid,
});
