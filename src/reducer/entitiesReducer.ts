import { ENTITIES_ACTION_TYPE } from "../action/entities";
import type { EntitiesAction } from "../action/entities";
import type { ConsolidatedWeather, Location } from "../components/WeatherApp";

export interface EntitiesState {
  weathers: {
    byWoeid: { [key: number]: ConsolidatedWeather };
    woeids: number[];
    selectedWoeid: number;
  };
  locations: {
    byWoeid: { [key: number]: Location };
    woeids: number[];
    selectedWoeid: number;
  };
}

const initialState: EntitiesState = {
  weathers: { byWoeid: {}, woeids: [], selectedWoeid: 0 },
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
          byWoeid: { ...state.locations.byWoeid, [payload.woeid]: payload },
          woeids: [...state.locations.woeids, payload.woeid],
        },
        weathers: {
          byWoeid: { ...state.weathers.byWoeid },
          woeids: [...state.weathers.woeids],
        },
      };
    }
    case ENTITIES_ACTION_TYPE.SAVE_WEATHER_DATA: {
      const payload = action.payload;
      return {
        ...state,
        locations: {
          byWoeid: { ...state.locations.byWoeid },
          woeids: [...state.locations.woeids],
        },
        weathers: {
          byWoeid: {
            ...state.weathers.byWoeid,
            [payload.woeid]: payload.weatherData,
          },
          woeids: [...state.weathers.woeids, payload.woeid],
        },
      };
    }
    case ENTITIES_ACTION_TYPE.SELECT_CURRENT_WOEID: {
      return {
        ...state,
        locations: {
          byWoeid: { ...state.locations.byWoeid },
          woeids: [...state.locations.woeids],
          selectedWoeid: action.payload,
        },
        weathers: {
          byWoeid: { ...state.weathers.byWoeid },
          woeids: [...state.weathers.woeids],
          selectedWoeid: action.payload,
        },
      };
    }
    default:
      return state;
  }
};
