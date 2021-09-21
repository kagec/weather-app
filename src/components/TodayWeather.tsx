import { useSelector } from "react-redux";
import type { VFC } from "react";
import type { Reducer } from "../reducer";

const changeDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toUTCString().slice(0, 12);
};

const TodayWeather: VFC = () => {
  const todayWeatherData = useSelector((state: Reducer) => state.weather[0]);
  const location = useSelector((state: Reducer) => state.location);

  return !todayWeatherData ? (
    <div>Loading...</div>
  ) : (
    <div>
      <p>{Math.round(todayWeatherData ? todayWeatherData.the_temp : 1)}℃</p>
      <p>{todayWeatherData?.weather_state_name}</p>
      <p>
        Today ・
        {todayWeatherData
          ? changeDateFormat(todayWeatherData.applicable_date)
          : null}
      </p>
      <p>{location?.title}</p>
    </div>
  );
};

export default TodayWeather;
