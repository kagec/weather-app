import { useSelector } from "react-redux";
import styled from "styled-components";
import type { ConsolidatedWeather } from "./WeatherApp";

const DIRECTION_16 = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

const getDirectionAngle: (direction: string) => number = (direction) =>
  22.5 * DIRECTION_16.indexOf(direction);

const Highlights = () => {
  const [weathers, selectedWoeid]: [
    { [key: number]: ConsolidatedWeather },
    number
  ] = useSelector((state) => [
    state.entities.weathers.byWoeid,
    state.entities.locations.selectedWoeid,
  ]);
  const weather = weathers?.[selectedWoeid]?.[0];

  return !weather ? (
    <div>Loading</div>
  ) : (
    <HighlightWrapper>
      <HighlightHeader>Today's Highlights</HighlightHeader>
      <HightlightContainer>
        <LargeTile>
          <Title>Wind status</Title>
          <WindData>
            {Math.round(weather.wind_speed)}
            <span>mph</span>
          </WindData>
          <div>
            <span className="material-icons">navigation</span>
            {weather.wind_direction_compass}
          </div>
        </LargeTile>
        <LargeTile>
          <Title>Humidity</Title>
          <HumidityData>
            {weather.humidity}
            <span>%</span>
          </HumidityData>
        </LargeTile>
        <SmallTile>
          <Title>Visibility</Title>
          <VisibilityData>
            {(Math.round(weather.visibility * 10) / 10).toLocaleString("de-DE")}
            <span> miles</span>
          </VisibilityData>
        </SmallTile>
        <SmallTile>
          <Title>Air Pressure</Title>
          <AirPressureData>
            {Math.round(weather.air_pressure).toLocaleString("de-DE")}
            <span> mb</span>
          </AirPressureData>
        </SmallTile>
      </HightlightContainer>
    </HighlightWrapper>
  );
};

const HighlightWrapper = styled.div`
  color: #e7e7eb;
  margin-top: 72px;
`;

const HighlightHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const HightlightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
  gap: 48px;
`;

const Tile = styled.div`
  background: #1e213a;
  width: 328px;
  text-align: center;
`;

const LargeTile = styled(Tile)`
  height: 204px;
`;

const SmallTile = styled(Tile)`
  height: 159px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-top: 22px;
`;

const Data = styled.div`
  font-size: 64px;
  font-weight: 700;
`;

const WindData = styled(Data)`
  margin-top: 6px;

  > span {
    font-size: 36px;
    font-weight: 500;
  }
`;

const HumidityData = styled(Data)`
  margin-top: 11px;

  > span {
    font-size: 36px;
    font-weight: 400;
  }
`;

const VisibilityData = styled(Data)`
  margin-top: 6px;

  > span {
    font-size: 36px;
    font-weight: 500;
  }
`;

const AirPressureData = styled(Data)`
  margin-top: 6px;

  > span {
    font-size: 36px;
    font-weight: 500;
  }
`;

export default Highlights;
