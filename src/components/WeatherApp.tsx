import axios from "axios";
import { useEffect } from "react";
import type { VFC, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodayWeather from "./TodayWeather";
import styled from "styled-components";
import SearchLocation from "./SearchLocation";
import {
  saveLocationData,
  saveWeatherData,
  selectCurrentWoeid,
} from "../action/entities";
import NextWeather from "./NextWeather";
import ChangeDegree from "./ChangeDegree";
import Highlights from "./Highlights";
import Footer from "./Footer";

axios.defaults.baseURL = "https://www.metaweather.com";

type Coords = Pick<GeolocationCoordinates, "latitude" | "longitude">;

export interface Weather {
  air_pressure: number;
  applicable_date: string;
  humidity: number;
  max_temp: number;
  min_temp: number;
  predictability: number;
  the_temp: number;
  visibility: number;
  weather_state_abbr: string;
  weather_state_name: string;
  wind_direction: number;
  wind_direction_compass: string;
  wind_speed: number;
}

export interface Location {
  distance: number;
  latt_long: string;
  location_type: string;
  title: string;
  woeid: number;
}

export type ConsolidatedWeather = Weather[];

const POS_OPTION: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 3000,
  maximumAge: 0,
};

// tokyo
const DEFAULT_LOCATION: Coords = {
  latitude: 35.670479,
  longitude: 139.740921,
};

const ERROR_MESSAGE: { [key: number]: string } = {
  0: "原因不明のエラーが発生しました…。",
  1: "位置情報の取得が許可されませんでした…。",
  2: "電波状況などで位置情報が取得できませんでした…。",
  3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
};

export const fetchWeatherData: (
  dispatch: Dispatch<any>,
  coords: Coords,
  byWoeid?: { [key: number]: Location }
) => Promise<void> = async (dispatch, coords, byWoeid) => {
  try {
    const locationData = await axios.get(
      `/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
    );

    if (byWoeid !== undefined) {
      if (byWoeid[locationData.data[0].woeid]) {
        dispatch(selectCurrentWoeid(locationData.data[0].woeid));
        return;
      }
    }
    dispatch(saveLocationData(locationData.data[0]));

    const weatherData = await axios.get(
      `/api/location/${locationData?.data[0]?.woeid}`
    );

    dispatch(
      saveWeatherData(
        weatherData.data.consolidated_weather,
        locationData.data[0].woeid
      )
    );
    dispatch(selectCurrentWoeid(locationData.data[0].woeid));
  } catch (e) {
    alert(e);
  }
};

export const getCurrentPosition: (
  dispatch: Dispatch<any>,
  byWoeid?: { [key: number]: Location }
) => void = (dispatch, byWoeid) => {
  const successFunc: PositionCallback = ({ coords }) => {
    fetchWeatherData(dispatch, coords, byWoeid);
  };

  const errorFunc: PositionErrorCallback = (error) => {
    alert(ERROR_MESSAGE[error.code]);
    fetchWeatherData(dispatch, DEFAULT_LOCATION, byWoeid);
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      successFunc,
      errorFunc,
      POS_OPTION
    );
  } else {
    alert("Geolocation API がサポートされていません");
    fetchWeatherData(dispatch, DEFAULT_LOCATION, byWoeid);
  }
};

const WeatherApp: VFC = () => {
  const dispatch = useDispatch();
  const isShowSearch: boolean = useSelector((state) => state.ui.isShowSearch);

  useEffect(() => {
    getCurrentPosition(dispatch);
  }, [dispatch]);

  return (
    <AppContainer>
      <MainContainer>
        {isShowSearch ? <SearchLocation /> : <TodayWeather />}
      </MainContainer>
      <SubContainer>
        <ChangeDegree />
        <NextWeather />
        <Highlights />
        <Footer />
      </SubContainer>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  position: relative;
  margin: 0 auto;

  @media screen and (max-width: 1339px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.div`
  background-color: #1e213a;
  overflow-y: auto;

  @media screen and (min-width: 1340px) {
    width: 459px;
    height: 1023px;
    border-radius: 10px 0 0 10px;
  }

  @media screen and (max-width: 1339px) {
    width: 375px;
    height: 810px;
    border-radius: 10px 10px 0 0;
  }
`;

const SubContainer = styled.div`
  background: #100e1d;
  color: #e7e7eb;

  @media screen and (min-width: 1340px) {
    width: 981px;
    height: 1023px;
    padding: 42px 123px 0 154px;
    border-radius: 0 10px 10px 0;
  }

  @media screen and (max-width: 1339px) {
    width: 375px;
    height: 1718px;
    padding: 52px 23px 0;
    border-radius: 0 0 10px 10px;
  }
`;

export default WeatherApp;
