import { combineReducers } from "redux";
import { weatherReducer } from "../reducer/weatherReducer";
import { locationReducer } from "./locationReducer";

export type Reducer = ReturnType<typeof reducer>;

export const reducer = combineReducers({
  init: () => ({}),
  weather: weatherReducer,
  location: locationReducer,
});
