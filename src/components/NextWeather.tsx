import { useSelector } from "react-redux";
import type { ConsolidatedWeather } from "./WeatherApp";
import { changeDateFormat, getWeatherImage } from "./TodayWeather";

const NextWeather = () => {
  const [weathers, selectedWoeid]: [
    { [key: number]: ConsolidatedWeather },
    number
  ] = useSelector((state) => [
    state.entities.weathers.byWoeid,
    state.entities.locations.selectedWoeid,
  ]);
  const weather = weathers?.[selectedWoeid]?.slice(1);

  return !weather ? (
    <div>Loading...</div>
  ) : (
    <ul>
      {weather.map((weather) => (
        <li key={weather.applicable_date}>
          <div>{changeDateFormat(weather.applicable_date)}</div>
          <div>{getWeatherImage(weather.weather_state_abbr)}</div>
          <div>
            {Math.round(weather.max_temp)}℃
            <span>{Math.round(weather.min_temp)}℃</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NextWeather;
