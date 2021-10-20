import { useSelector } from "react-redux";
import type { ConsolidatedWeather } from "./WeatherApp";
import { changeDateFormat, getWeatherImage } from "./TodayWeather";
import styled from "styled-components";
import { useTemperature } from "../hooks/useTemperature";

const NextWeather = () => {
  const [weathers, selectedWoeid]: [
    { [key: number]: ConsolidatedWeather },
    number
  ] = useSelector((state) => [
    state.entities.weathers.byWoeid,
    state.entities.locations.selectedWoeid,
  ]);
  const weather = weathers?.[selectedWoeid]?.slice(1);
  const [degree, temperature] = useTemperature();

  return !weather ? (
    <Loading>Loading...</Loading>
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
          <Temperature>
            {temperature(weather.max_temp)}
            {degree}
            <span>
              {temperature(weather.min_temp)}
              {degree}
            </span>
          </Temperature>
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
  margin-top: 66px;

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
    height: 62px;
  }
`;

const Temperature = styled.div`
  margin-top: 31px;

  > span {
    margin-left: 15px;
    color: #a09fb1;
  }
`;

const Loading = styled.div`
  color: #fff;
  text-align: center;
`;

export default NextWeather;
