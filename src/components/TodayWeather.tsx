import { useSelector } from "react-redux";
import type { VFC } from "react";
import { RootState } from "../store";
import styled from "styled-components";
import backgroundImage from "../image/Cloud-background.png";
import Clear from "../image/Clear.png";
import Hail from "../image/Hail.png";
import HeavyCloud from "../image/HeavyCloud.png";
import HeavyRain from "../image/HeavyRain.png";
import LightCloud from "../image/LightCloud.png";
import LightRain from "../image/LightRain.png";
import Shower from "../image/Shower.png";
import Sleet from "../image/Sleet.png";
import Snow from "../image/Snow.png";
import Thunderstorm from "../image/Thunderstorm.png";

const changeDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toUTCString().slice(0, 12);
};

const TodayWeather: VFC = () => {
  const state = useSelector((state: RootState) => state);
  const todayWeatherData = state.weather[0];
  const location = state.location;

  return (
    <TodayWeatherWrapper>
      {!todayWeatherData ? (
        <div>Loading...</div>
      ) : (
        <TodayWeatherContainer>
          <img
            src={`https://www.metaweather.com/static/img/weather/png/${todayWeatherData.weather_state_abbr}.png`}
            alt="weather"
          />
          <Temperature>
            {Math.round(todayWeatherData ? todayWeatherData.the_temp : 1)}
            <span>℃</span>
          </Temperature>
          <WeatherName>{todayWeatherData.weather_state_name}</WeatherName>
          <Day>
            {/* ここの{" "}はレイアウトの調整です */}
            Today ・{" "}
            {todayWeatherData
              ? changeDateFormat(todayWeatherData.applicable_date)
              : null}
          </Day>
          <Place>
            <MaterialIcon className="material-icons">location_on</MaterialIcon>
            {location.title}
          </Place>
        </TodayWeatherContainer>
      )}
    </TodayWeatherWrapper>
  );
};

/* 
  今のブランチでは天気の表示だけの予定です
  次のブランチで検索ヘッダーを追加して、画像等の位置調整をするつもりです
*/

const TodayWeatherWrapper = styled.div`
  position: relative;
  width: 459px;
  height: 1023px;
  padding: 50px;
  background-color: #1e213a;
  text-align: center;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: auto;
  background-position: -110px 0;
`;

const TodayWeatherContainer = styled.div`
  > img {
    width: 202px;
    height: 234px;
  }

  > p:not(:last-child) {
    margin-top: 87px;
  }
`;

const Temperature = styled.p`
  font-weight: 500;
  font-size: 144px;
  color: #e7e7eb;

  > span {
    font-weight: 100;
    font-size: 48px;
    color: #a09fb1;
  }
`;

const WeatherName = styled.p`
  color: #a09fb1;
  font-weight: 600;
  font-size: 36px;
`;

const Day = styled.p`
  color: #88869d;
  font-weight: 500;
  font-size: 18px;
`;

const Place = styled.p`
  color: #88869d;
  font-weight: 600;
  font-size: 18px;
  margin-top: 32px;
`;

const MaterialIcon = styled.span`
  vertical-align: top;
  margin-right: 9px;
  font-size: 22px;
`;

export default TodayWeather;
