import { combineReducers } from "redux";

import { isSearchReducer } from "./isSearchReducer";
import { citiesLogReducer } from "./citiesLogReducer";
import { entitiesReducer } from "./entitiesReducer";

export const reducer = combineReducers({
  isSearch: isSearchReducer,
  citiesLog: citiesLogReducer,
  entities: entitiesReducer,
});
