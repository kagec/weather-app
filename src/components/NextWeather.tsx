import { useSelector } from "react-redux";
import type { ConsolidatedWeather } from "./WeatherApp";
import { changeDateFormat, getWeatherImage } from "./TodayWeather";
import styled from "styled-components";

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
    <NextWeatherUl>
      {weather.map((weather, index) => (
        <li key={weather.applicable_date}>
          <div>
            {index === 0
              ? "Tomorrow"
              : changeDateFormat(weather.applicable_date)}
          </div>
          <ImageContainer>
            {getWeatherImage(weather.weather_state_abbr)}
          </ImageContainer>
          <div>
            {Math.round(weather.max_temp)}℃
            <span>{Math.round(weather.min_temp)}℃</span>
          </div>
        </li>
      ))}
    </NextWeatherUl>
  );
};

const NextWeatherUl = styled.ul`
  list-style: none;
  display: flex;
  padding: 0;
  column-gap: 26px;
  font-weight: 500;
  font-size: 16px;

  > li {
    width: 120px;
    height: 177px;
    padding: 18px 0;
    text-align: center;
    background-color: #1e213a;
  }
`;

const ImageContainer = styled.div`
  margin-top: 10px;

  > img {
    width: 56px;
    height: 62px;
  }
`;

export default NextWeather;
