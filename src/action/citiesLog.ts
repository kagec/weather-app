export type AddCityLog = ReturnType<typeof addCityLog>;

export const CITIES_LOG_ACTION_TYPE = {
  ADD_CITY_LOG: "ADD_CITY_LOG",
} as const;

export const addCityLog = (city: string) => ({
  type: CITIES_LOG_ACTION_TYPE.ADD_CITY_LOG,
  payload: city,
});
