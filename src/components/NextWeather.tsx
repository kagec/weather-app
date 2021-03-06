import { useSelector } from "react-redux";
import type { ConsolidatedWeather } from "./WeatherApp";
import { changeDateFormat, getWeatherImage } from "./TodayWeather";
import styled from "styled-components";
import { useTemperature } from "../hooks/useTemperature";
import {
  LoadingAnimation,
  LoadingContainer,
} from "./styled-components/loading";

const NextWeather = () => {
  const [weathers, selectedWoeid, isSearch]: [
    { [key: number]: ConsolidatedWeather },
    number,
    boolean
  ] = useSelector((state) => [
    state.entities.weathers.byWoeid,
    state.entities.locations.selectedWoeid,
    state.ui.isSearch,
  ]);
  const weather = weathers?.[selectedWoeid]?.slice(1);
  const [degree, temperature] = useTemperature();

  return !weather || isSearch ? (
    <Loading>
      <LoadingAnimation />
    </Loading>
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
  font-weight: 500;
  font-size: 16px;
  margin-top: 66px;
  column-gap: 26px;

  > li {
    width: 120px;
    height: 177px;
    padding: 18px 0;
    text-align: center;
    background-color: #1e213a;
  }

  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
    justify-content: center;
    margin: 0;
  }

  @media screen and (max-width: 767px) {
    padding: 0 calc((100% - 266px) / 2);
    justify-content: flex-start;
    gap: 32px 26px;
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

const Loading = styled(LoadingContainer)`
  height: 243px;

  @media screen and (max-width: 1024px) {
    height: 177px;
  }

  @media screen and (max-width: 767px) {
    height: 595px;
  }
`;

export default NextWeather;
