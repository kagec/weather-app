import { useSelector } from "react-redux";
import type { VFC } from "react";
import { RootState } from "../store";

const changeDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toUTCString().slice(0, 12);
};

const TodayWeather: VFC = () => {
  const todayWeatherData = useSelector((state: RootState) => state.weather[0]);
  const location = useSelector((state: RootState) => state.location);

  return !todayWeatherData ? (
    <div>Loading...</div>
  ) : (
    <div>
      <img
        src={`https://www.metaweather.com/static/img/weather/png/${todayWeatherData?.weather_state_abbr}.png`}
        alt="weather"
      />
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
