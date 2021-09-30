import { useSelector } from "react-redux";

const CitiesLog = () => {
  const weatherData = useSelector((state) => state.weather);
  const cities = Object.keys(weatherData);

  return (
    <ul>
      {cities.map((city) => (
        <li>
          <button>{city}</button>
        </li>
      ))}
    </ul>
  );
};

export default CitiesLog;
