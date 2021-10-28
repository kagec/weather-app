import { useSelector } from "react-redux";
import styled, { css } from "styled-components";
import type { ConsolidatedWeather } from "./WeatherApp";

const DIRECTION_16: { [key: string]: number } = {
  N: 0,
  NNE: 22.5,
  NE: 45,
  ENE: 67.5,
  E: 90,
  ESE: 112.5,
  SE: 135,
  SSE: 157.5,
  S: 180,
  SSW: 202.5,
  SW: 225,
  WSW: 247.5,
  W: 270,
  WNW: 292.5,
  NW: 315,
  NNW: 337.5,
};

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
      <HighlightContainer>
        <LargeTile>
          <Title>Wind status</Title>
          <WindData>
            {Math.round(weather.wind_speed)}
            <span>mph</span>
          </WindData>
          <Compass>
            <MaterialIcon
              className="material-icons"
              angle={DIRECTION_16[weather.wind_direction_compass]}
            >
              navigation
            </MaterialIcon>
            {weather.wind_direction_compass}
          </Compass>
        </LargeTile>
        <LargeTile>
          <Title>Humidity</Title>
          <HumidityData>
            {weather.humidity}
            <span>%</span>
          </HumidityData>
          <HumidityGauge>
            <Scale>
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </Scale>
            <Gauge percent={weather.humidity}></Gauge>
            <span>%</span>
          </HumidityGauge>
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
      </HighlightContainer>
    </HighlightWrapper>
  );
};

const HighlightWrapper = styled.div`
  color: #e7e7eb;
  margin-top: 72px;

  @media screen and (max-width: 1024px) {
    margin-top: 51px;
  }
`;

const HighlightHeader = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const HighlightContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 32px;
  gap: 48px;

  @media screen and (max-width: 1024px) {
    gap: 32px;
  }
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

const Compass = styled.div`
  font-size: 14px;
  font-weight: 500;
  margin-top: 17px;
`;

const MaterialIcon = styled.span<{ angle: number }>`
  font-size: 16px;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: #ffffff4d;
  padding-top: 6px;
  margin-right: 8px;

  ${({ angle }) => css`
    transform: rotate(${angle}deg);
  `}
`;

const HumidityGauge = styled.div`
  margin: 12px auto 0;
  width: 229px;
  font-size: 12px;
  font-weight: 700;
  color: #a09fb1;

  > span {
    display: flex;
    justify-content: flex-end;
  }
`;

const Scale = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Gauge = styled.div<{ percent: number }>`
  position: relative;
  height: 8px;
  border-radius: 80px;
  background-color: #e7e7eb;

  &::before {
    content: "";
    height: 8px;
    border-radius: 80px;
    position: absolute;
    left: 0;
    animation: humidityPercent 1s ease 0s 1 normal forwards;

    ${({ percent }) => css`
      @keyframes humidityPercent {
        0% {
          width: 0;
          background-color: #ffec65;
        }

        100% {
          width: ${percent}%;
          background-color: #ffec65;
        }
      }
    `};
  }
`;

export default Highlights;
