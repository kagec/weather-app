import { useSelector } from "react-redux";
import type { VFC } from "react";
import type { Reducer } from "../reducer";

const TodayWeather: VFC = () => {
  const todayWeatherData = useSelector((state: Reducer) => state.weather[0]);
  const location = useSelector((state: Reducer) => state.location);

  return <div></div>;
};

export default TodayWeather;
