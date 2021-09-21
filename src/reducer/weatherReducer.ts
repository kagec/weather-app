import { WEATHER_ACTION_TYPE } from "../action/weather";
import type { ConsolidatedWeather } from "../components/WeatherApp";

export const weatherReducer = (
  state: ConsolidatedWeather = [],
  { type, payload }: { type: string; payload: ConsolidatedWeather }
) => {
  switch (type) {
    case WEATHER_ACTION_TYPE.SAVE_WEATHER_DATA:
      return { ...state, ...payload };
    default:
      return state;
  }
};
