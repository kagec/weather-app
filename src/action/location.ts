import { Location } from "../components/WeatherApp";

export const LOCATION_ACTION_TYPE = {
  SAVE_LOCATION_DATA: "SAVE_LOCATION_DATA",
} as const;

export const saveLocationData = (locationData: Location) => ({
  type: LOCATION_ACTION_TYPE.SAVE_LOCATION_DATA,
  payload: locationData,
});
