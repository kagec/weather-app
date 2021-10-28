import { useDispatch, useSelector } from "react-redux";
import type { VFC } from "react";
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
import { getCurrentPosition } from "./WeatherApp";
import { Button } from "./styled-components/styledButton";
import { toggleSearch } from "../action/ui";
import { useTemperature } from "../hooks/useTemperature";

export const changeDateFormat = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toUTCString().slice(0, 12);
};

export const getWeatherImage: (weatherStateAbbr: string) => JSX.Element = (
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
  const [locations, weathers, selectedWoeid]: [
    locations: { [key: number]: Location },
    weathers: { [key: number]: ConsolidatedWeather },
    selectedWoeid: number
  ] = useSelector((state) => [
    state.entities.locations.byWoeid,
    state.entities.weathers.byWoeid,
    state.entities.locations.selectedWoeid,
  ]);
  const dispatch = useDispatch();
  const location = locations?.[selectedWoeid];
  const todayWeatherData = weathers?.[selectedWoeid]?.[0];
  const [degree, temperature] = useTemperature();

  return (
    <TodayWeatherWrapper>
      {!todayWeatherData || !location ? (
        <Loading>Loading...</Loading>
      ) : (
        <TodayWeatherContainer>
          <TodayWeatherHeader>
            <SearchButton
              onClick={() => {
                dispatch(toggleSearch());
              }}
            >
              Search for place
            </SearchButton>
            <MyLocationButton
              onClick={() => getCurrentPosition(dispatch, locations)}
            >
              <span className="material-icons">my_location</span>
            </MyLocationButton>
          </TodayWeatherHeader>
          <ImageContainer>
            {getWeatherImage(todayWeatherData.weather_state_abbr)}
          </ImageContainer>
          <Temperature>
            {temperature(todayWeatherData.the_temp)}
            <span>{degree}</span>
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

const TodayWeatherWrapper = styled.div`
  position: relative;
  text-align: center;
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  padding: 46px;
  background-position: -110px 103px;
  background-size: auto;

  @media screen and (max-width: 1024px) {
    padding: 18px 12px;
    background-position: 50% 15%;
  }
`;

const TodayWeatherContainer = styled.div`
  @media screen and (min-width: 1025px) {
    > div:not(:last-child) {
      margin-top: 87px;
    }
  }
`;

const ImageContainer = styled.div`
  display: inline-block;
  height: 250px;

  @media screen and (max-width: 1024px) {
    margin-top: 70px;

    > img {
      height: 174px;
    }
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

  @media screen and (max-width: 1024px) {
    margin-top: 35px;
  }
`;

const WeatherName = styled.div`
  color: #a09fb1;
  font-weight: 600;
  font-size: 36px;

  @media screen and (max-width: 1024px) {
    margin-top: 23px;
  }
`;

const Day = styled.div`
  color: #88869d;
  font-weight: 500;
  font-size: 18px;

  @media screen and (max-width: 1024px) {
    margin-top: 45px;
  }
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
`;

const SearchButton = styled(Button)`
  width: 161px;
  height: 40px;
  font-weight: 500;
  font-size: 16px;
  background-color: #6e707a;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-color: transparent;
`;

const MyLocationButton = styled(Button)`
  width: 40px;
  height: 40px;
  padding-top: 5px;
  background: rgba(255, 255, 255, 0.2);
  border-color: transparent;
  border-radius: 25px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default TodayWeather;
