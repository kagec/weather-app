import { combineReducers } from "redux";
import { weatherReducer } from "../reducer/weatherReducer";
import { locationReducer } from "./locationReducer";
import { isSearchReducer } from "./isSearchReducer";

export const reducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  isSearch: isSearchReducer,
});
