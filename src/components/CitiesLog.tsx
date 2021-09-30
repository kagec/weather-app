import { useSelector } from "react-redux";
import styled from "styled-components";

const CitiesLog = () => {
  const weatherData = useSelector((state) => state.weather);
  const cities = Object.keys(weatherData);

  return (
    <CitiesLogList>
      {cities.map((city) => (
        <li>
          <button>{city}</button>
        </li>
      ))}
    </CitiesLogList>
  );
};

const CitiesLogList = styled.ul`
  list-style: none;
  margin-top: 58px;
`;

export default CitiesLog;
