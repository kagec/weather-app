import { WeatherAction, WEATHER_ACTION_TYPE } from "../action/weather";
import type { ConsolidatedWeather } from "../components/WeatherApp";

export const weatherReducer = (
  state: ConsolidatedWeather = [],
  { type, payload }: WeatherAction
) => {
  switch (type) {
    case WEATHER_ACTION_TYPE.SAVE_WEATHER_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
