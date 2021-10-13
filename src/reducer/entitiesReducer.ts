import { ENTITIES_ACTION_TYPE } from "../action/entities";
import type { EntitiesAction } from "../action/entities";
import type { ConsolidatedWeather, Location } from "../components/WeatherApp";

export interface EntitiesState {
  weathers: {
    byWoeid: { [key: number]: ConsolidatedWeather };
  };
  locations: {
    byWoeid: { [key: number]: Location };
    woeids: number[];
    selectedWoeid: number;
  };
}

const initialState: EntitiesState = {
  weathers: { byWoeid: {} },
  locations: { byWoeid: {}, woeids: [], selectedWoeid: 0 },
};

export const entitiesReducer = (
  state = initialState,
  action: EntitiesAction
) => {
  switch (action.type) {
    case ENTITIES_ACTION_TYPE.SAVE_LOCATION_DATA: {
      const payload = action.payload;
      return {
        ...state,
        locations: {
          ...state.locations,
          byWoeid: { ...state.locations.byWoeid, [payload.woeid]: payload },
          woeids: [
            ...Array.from(new Set([...state.locations.woeids, payload.woeid])),
          ],
        },
      };
    }
    case ENTITIES_ACTION_TYPE.SAVE_WEATHER_DATA: {
      const payload = action.payload;
      return {
        ...state,
        weathers: {
          byWoeid: {
            ...state.weathers.byWoeid,
            [payload.woeid]: payload.weatherData,
          },
        },
      };
    }
    case ENTITIES_ACTION_TYPE.SELECT_CURRENT_WOEID: {
      return {
        ...state,
        locations: {
          ...state.locations,
          selectedWoeid: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
