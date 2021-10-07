import axios from "axios";
import type { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addCityLog } from "../action/citiesLog";
import { isSearchOff } from "../action/isSearch";
import { saveLocationData } from "../action/location";
import { saveWeatherData } from "../action/weather";
import { Button } from "./styled-components/styledButton";

export const fetchWeatherDataByCityName: (
  cityName: string,
  dispatch: Dispatch<any>
) => Promise<void> = async (cityName, dispatch) => {
  try {
    const locationData = await axios.get(
      `/api/location/search/?query=${cityName}`
    );
    dispatch(saveLocationData(locationData.data[0]));
    dispatch(addCityLog(locationData.data[0].title));

    const weatherData = await axios.get(
      `/api/location/${locationData?.data[0]?.woeid}`
    );

    dispatch(saveWeatherData(weatherData.data.consolidated_weather));
  } catch (e) {
    alert(e);
  }
};

const CitiesLog = () => {
  const cities = useSelector((state) => state.citiesLog);
  const dispatch = useDispatch();

  return (
    <CitiesLogList>
      {cities.map((city, index) => (
        <li key={index}>
          <CityButton
            onClick={() => {
              fetchWeatherDataByCityName(city, dispatch);
              dispatch(isSearchOff());
            }}
          >
            {city}
            <span className="material-icons">chevron_right</span>
          </CityButton>
        </li>
      ))}
    </CitiesLogList>
  );
};

const CitiesLogList = styled.ul`
  list-style: none;
  margin-top: 58px;
  padding: 0px;

  > li:not(:first-child) {
    margin-top: 25px;
  }
`;

const CityButton = styled(Button)`
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  height: 64px;
  border: 1px solid transparent;
  background-color: transparent;
  word-break: break-word;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;

  &:hover {
    border: 1px solid #616475;

    > span {
      visibility: visible;
    }
  }

  > span {
    visibility: hidden;
  }
`;

export default CitiesLog;
