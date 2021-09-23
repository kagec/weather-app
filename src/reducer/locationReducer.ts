import { LocationAction, LOCATION_ACTION_TYPE } from "../action/location";
import type { Location } from "../components/WeatherApp";

const initialState: Location = {
  distance: 0,
  title: "Tokyo",
  location_type: "City",
  woeid: 1118370,
  latt_long: "35.670479,139.740921",
};

export const locationReducer = (
  state = initialState,
  { type, payload }: LocationAction
) => {
  switch (type) {
    case LOCATION_ACTION_TYPE.SAVE_LOCATION_DATA:
      return { ...state, ...payload };

    default:
      return state;
  }
};
