export type UIAction =
  | ReturnType<typeof isSearchOn>
  | ReturnType<typeof isSearchOff>;

export const UI_ACTION_TYPE = {
  IS_SEARCH_ON: "IS_SEARCH_ON",
  IS_SEARCH_OFF: "IS_SEARCH_OFF",
} as const;

export const isSearchOn = () => ({
  type: UI_ACTION_TYPE.IS_SEARCH_ON,
});

export const isSearchOff = () => ({
  type: UI_ACTION_TYPE.IS_SEARCH_OFF,
});
