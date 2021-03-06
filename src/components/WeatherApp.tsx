import axios from "axios";
import { useEffect } from "react";
import type { VFC, Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodayWeather from "./TodayWeather";
import styled, { css } from "styled-components";
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
import { toggleIsSearch } from "../action/ui";

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
  dispatch(toggleIsSearch());
  try {
    const locationData = await axios.get(
      `/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
    );

    if (byWoeid !== undefined) {
      if (byWoeid[locationData.data[0].woeid]) {
        dispatch(selectCurrentWoeid(locationData.data[0].woeid));
        dispatch(toggleIsSearch());
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
    dispatch(toggleIsSearch());
  } catch (e) {
    dispatch(toggleIsSearch());
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
      <MainContainer isShowSearch={isShowSearch}>
        {isShowSearch ? <SearchLocation /> : <TodayWeather />}
      </MainContainer>
      <SubContainer isShowSearch={isShowSearch}>
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

  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;

const MainContainer = styled.div<{ isShowSearch: boolean }>`
  background-color: #1e213a;
  overflow-y: auto;
  width: 459px;
  height: 1023px;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    min-width: 100%;

    ${({ isShowSearch }) => css`
      ${isShowSearch ? `height: 100vh;` : `height: 810px;`}
    `}
  }
`;

const SubContainer = styled.div<{ isShowSearch: boolean }>`
  background: #100e1d;
  color: #e7e7eb;
  width: 981px;
  height: 1023px;
  padding: 42px 123px 0 154px;

  @media screen and (max-width: 1024px) {
    width: 100vw;
    min-width: 100%;
    height: auto;
    padding: 52px 23px 24px;

    ${({ isShowSearch }) => css`
      ${isShowSearch &&
      `
      display: none;
    `}
    `}
  }
`;

export default WeatherApp;
