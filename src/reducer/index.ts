import { combineReducers } from "redux";
import { weatherReducer } from "../reducer/weatherReducer";
import { locationReducer } from "./locationReducer";

export type Reducer = ReturnType<typeof reducer>;

export const reducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
});
