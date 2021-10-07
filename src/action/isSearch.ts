export type IsSearchOnAction = ReturnType<typeof isSearchOn>;
export type IsSearchOffAction = ReturnType<typeof isSearchOff>;

export const IS_SEARCH_ACTION_TYPE = {
  IS_SEARCH_ON: "IS_SEARCH_ON",
  IS_SEARCH_OFF: "IS_SEARCH_OFF",
} as const;

export const isSearchOn = () => ({
  type: IS_SEARCH_ACTION_TYPE.IS_SEARCH_ON,
  payload: true,
});

export const isSearchOff = () => ({
  type: IS_SEARCH_ACTION_TYPE.IS_SEARCH_OFF,
  payload: false,
});
