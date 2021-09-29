import { WeatherAction, WEATHER_ACTION_TYPE } from "../action/weather";
import type { ConsolidatedWeather } from "../components/WeatherApp";

export interface WeatherState {
  [key: string]: ConsolidatedWeather;
}

export const weatherReducer = (
  state: WeatherState = {},
  { type, payload }: WeatherAction
) => {
  switch (type) {
    case WEATHER_ACTION_TYPE.SAVE_WEATHER_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
