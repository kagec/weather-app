import { useSelector } from "react-redux";
import type { VFC } from "react";
import { RootState } from "../store";
import styled from "styled-components";
import backgroundImage from "../image/Cloud-background.png";

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
        <div>
          <img
            src={`https://www.metaweather.com/static/img/weather/png/${todayWeatherData.weather_state_abbr}.png`}
            alt="weather"
          />
          <p>
            {Math.round(todayWeatherData ? todayWeatherData.the_temp : 1)}
            <span>℃</span>
          </p>
          <p>{todayWeatherData.weather_state_name}</p>
          <p>
            {/* ここの{" "}はレイアウトの調整です */}
            Today ・{" "}
            {todayWeatherData
              ? changeDateFormat(todayWeatherData.applicable_date)
              : null}
          </p>
          <p>{location.title}</p>
        </div>
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

export default TodayWeather;
