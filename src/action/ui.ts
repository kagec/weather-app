export type UIAction =
  | ReturnType<typeof toggleSearch>
  | ReturnType<typeof changeDegreeToFahrenheit>;

export const UI_ACTION_TYPE = {
  TOGGLE_SHOW_SEARCH: "TOGGLE_SHOW_SEARCH",
  CHANGE_DEGREE_FAHRENHEIT: "CHANGE_DEGREE_FAHRENHEIT",
} as const;

export const toggleSearch = () => ({
  type: UI_ACTION_TYPE.TOGGLE_SHOW_SEARCH,
});

export const changeDegreeToFahrenheit = () => ({
  type: UI_ACTION_TYPE.CHANGE_DEGREE_FAHRENHEIT,
});
