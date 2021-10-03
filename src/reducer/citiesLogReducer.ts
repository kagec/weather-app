import { CITIES_LOG_ACTION_TYPE } from "../action/citiesLog";
import type { AddCityLog } from "../action/citiesLog";

export const citiesLogReducer = (
  state: string[] = [],
  { type, payload }: AddCityLog
) => {
  switch (type) {
    case CITIES_LOG_ACTION_TYPE.ADD_CITY_LOG:
      return [...Array.from(new Set([...state, payload]))];

    default:
      return state;
  }
};
