export type UIAction =
  | ReturnType<typeof toggleSearch>
  | ReturnType<typeof changeDegreeToFahrenheit>
  | ReturnType<typeof changeDegreeToCelsius>;

export const UI_ACTION_TYPE = {
  TOGGLE_SHOW_SEARCH: "TOGGLE_SHOW_SEARCH",
  CHANGE_DEGREE_FAHRENHEIT: "CHANGE_DEGREE_FAHRENHEIT",
  CHANGE_DEGREE_CELSIUS: "CHANGE_DEGREE_CELSIUS",
} as const;

export const toggleSearch = () => ({
  type: UI_ACTION_TYPE.TOGGLE_SHOW_SEARCH,
});

export const changeDegreeToFahrenheit = () => ({
  type: UI_ACTION_TYPE.CHANGE_DEGREE_FAHRENHEIT,
});

export const changeDegreeToCelsius = () => ({
  type: UI_ACTION_TYPE.CHANGE_DEGREE_CELSIUS,
});
