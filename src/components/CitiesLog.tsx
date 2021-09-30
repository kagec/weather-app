import { useSelector } from "react-redux";
import styled from "styled-components";
import chevronRight from "../image/baseline_chevron_right_white_24dp.png";

const CitiesLog = () => {
  const weatherData = useSelector((state) => state.weather);
  const cities = Object.keys(weatherData);

  return (
    <CitiesLogList>
      {cities.map((city) => (
        <li>
          <CityButton>{city}</CityButton>
        </li>
      ))}
    </CitiesLogList>
  );
};

const CitiesLogList = styled.ul`
  list-style: none;
  margin-top: 58px;
  padding: 0px;
`;

const CityButton = styled.button`
  width: 100%;
  color: #e7e7eb;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  height: 64px;
  text-align: left;
  border: transparent;
  background-color: transparent;
  word-break: break-word;

  &:hover {
    border: 1px solid #616475;
    background-image: url(${chevronRight});
    background-repeat: no-repeat;
    background-position: right;
  }
`;

export default CitiesLog;
