import { combineReducers } from "redux";
import { weatherReducer } from "../reducer/weatherReducer";
import { locationReducer } from "./locationReducer";
import { isSearchReducer } from "./isSearchReducer";
import { citiesLogReducer } from "./citiesLogReducer";
import { entitiesReducer } from "./entitiesReducer";

export const reducer = combineReducers({
  weather: weatherReducer,
  location: locationReducer,
  isSearch: isSearchReducer,
  citiesLog: citiesLogReducer,
  entities: entitiesReducer,
});
