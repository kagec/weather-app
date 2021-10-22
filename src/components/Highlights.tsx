import { useSelector } from "react-redux";
import styled from "styled-components";
import type { ConsolidatedWeather } from "./WeatherApp";

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
          <div>Wind status</div>
          <div>
            {Math.round(weather.wind_speed)}
            <span>mph</span>
          </div>
          <div>
            <span className="material-icons">navigation</span>
            {weather.wind_direction_compass}
          </div>
        </LargeTile>
        <LargeTile>
          <div>Humidity</div>
          <div>
            {weather.humidity}
            <span>%</span>
          </div>
        </LargeTile>
        <SmallTile>
          <div>Visibility</div>
          <div>
            {(Math.round(weather.visibility * 10) / 10).toLocaleString("de-DE")}
            <span> miles</span>
          </div>
        </SmallTile>
        <SmallTile>
          <div>Air Pressure</div>
          <div>
            {Math.round(weather.air_pressure).toLocaleString("de-DE")}
            <span> mb</span>
          </div>
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

export default Highlights;
