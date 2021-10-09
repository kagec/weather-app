import { ENTITIES_ACTION_TYPE } from "../action/entities";
import type { EntitiesAction } from "../action/entities";
import type { ConsolidatedWeather, Location } from "../components/WeatherApp";

export interface EntitiesState {
  weathers: {
    byWoeid: { [key: number]: ConsolidatedWeather };
    woeids: number[];
  };
  locations: { byWoeid: { [key: number]: Location }; woeids: number[] };
}

const initialState: EntitiesState = {
  weathers: { byWoeid: {}, woeids: [] },
  locations: { byWoeid: {}, woeids: [] },
};

export const entitiesReducer = (
  state = initialState,
  action: EntitiesAction
) => {
  switch (action.type) {
    default:
      return state;
  }
};
