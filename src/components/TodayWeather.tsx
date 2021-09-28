import { useDispatch, useSelector } from "react-redux";
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
import type { ConsolidatedWeather, Location } from "./WeatherApp";
import { isSearchOn } from "../action/isSearch";

const changeDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toUTCString().slice(0, 12);
};

const getWeatherImage: (weatherStateAbbr: string) => JSX.Element = (
  weatherStateAbbr
) => {
  switch (weatherStateAbbr) {
    case "c":
      return <img src={Clear} alt="clear" />;
    case "h":
      return <img src={Hail} alt="hail" />;
    case "hc":
      return <img src={HeavyCloud} alt="heavy cloud" />;
    case "hr":
      return <img src={HeavyRain} alt="heavy rain" />;
    case "lc":
      return <img src={LightCloud} alt="light cloud" />;
    case "lr":
      return <img src={LightRain} alt="light rain" />;
    case "s":
      return <img src={Shower} alt="shower" />;
    case "sl":
      return <img src={Sleet} alt="sleet" />;
    case "sn":
      return <img src={Snow} alt="snow" />;
    case "t":
      return <img src={Thunderstorm} alt="thunderstorm" />;
    default:
      return (
        <img
          src={`https://www.metaweather.com/static/img/weather/png/${weatherStateAbbr}.png`}
          alt="weather"
        />
      );
  }
};

const TodayWeather: VFC = () => {
  const [location, weather]: [Location, ConsolidatedWeather] = useSelector(
    (state: RootState) => [state.location, state.weather]
  );
  const dispatch = useDispatch();

  const todayWeatherData = weather[0];

  return (
    <TodayWeatherWrapper>
      {!todayWeatherData ? (
        <Loading>Loading...</Loading>
      ) : (
        <TodayWeatherContainer>
          <TodayWeatherHeader>
            <button
              onClick={() => {
                dispatch(isSearchOn());
              }}
            >
              Search for place
            </button>
            <span className="material-icons">my_location</span>
          </TodayWeatherHeader>
          {getWeatherImage(todayWeatherData.weather_state_abbr)}
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
  padding: 46px;
  text-align: center;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: auto;
  background-position: -110px 103px;
`;

const TodayWeatherContainer = styled.div`
  > img {
    margin-top: 87px;
  }

  > div:not(:last-child) {
    margin-top: 87px;
  }
`;

const Temperature = styled.div`
  font-weight: 500;
  font-size: 144px;
  color: #e7e7eb;

  > span {
    font-weight: 100;
    font-size: 48px;
    color: #a09fb1;
  }
`;

const WeatherName = styled.div`
  color: #a09fb1;
  font-weight: 600;
  font-size: 36px;
`;

const Day = styled.div`
  color: #88869d;
  font-weight: 500;
  font-size: 18px;
`;

const Place = styled.div`
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

const Loading = styled.div`
  color: #fff;
`;

const TodayWeatherHeader = styled.header`
  display: flex;
  justify-content: space-between;

  > button {
    width: 161px;
    height: 40px;
    background-color: #6e707a;
    color: #e7e7eb;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

  > span {
    width: 40px;
    height: 40px;
    padding-top: 8px;
    color: #e7e7eb;
    background-color: #6e707a;
    border-radius: 25px;
  }
`;

export default TodayWeather;
