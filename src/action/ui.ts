export type UIAction = ReturnType<typeof toggleSearch>;

export const UI_ACTION_TYPE = {
  TOGGLE_SHOW_SEARCH: "TOGGLE_SHOW_SEARCH",
} as const;

export const toggleSearch = () => ({
  type: UI_ACTION_TYPE.TOGGLE_SHOW_SEARCH,
});
