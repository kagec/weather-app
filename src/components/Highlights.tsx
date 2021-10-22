import { useSelector } from "react-redux";
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
    <div>
      <div>Today's Highlights</div>
      <div>
        <div>
          <div>Wind status</div>
          <div>
            {Math.round(weather.wind_speed)}
            <span>mph</span>
          </div>
          <div>
            <span className="material-icons">navigation</span>
            {weather.wind_direction_compass}
          </div>
        </div>
        <div>
          <div>Humidity</div>
          <div>
            {weather.humidity}
            <span>%</span>
          </div>
        </div>
        <div>
          <div>Visibility</div>
          <div>
            {(Math.round(weather.visibility * 10) / 10).toLocaleString("de-DE")}
            <span> miles</span>
          </div>
        </div>
        <div>
          <div>Air Pressure</div>
          <div>
            {Math.round(weather.air_pressure).toLocaleString("de-DE")}
            <span> mb</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Highlights;
