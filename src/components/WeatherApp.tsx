import axios from "axios";
import { useEffect } from "react";
import type { VFC } from "react";
import { useDispatch } from "react-redux";
import TodayWeather from "./TodayWeather";
import { saveLocationData } from "../action/location";

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

const WeatherApp: VFC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeatherData = async (coords: Coords): Promise<void> => {
      try {
        const locationData = await axios.get(
          `/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
        );

        dispatch(saveLocationData(locationData.data[0]));

        const weatherData = await axios.get(
          `/api/location/${locationData?.data[0]?.woeid}`
        );

        dispatch({
          type: "SAVE_WEATHER_DATA",
          payload: weatherData.data.consolidated_weather,
        });
      } catch (e) {
        alert(e);
      }
    };

    const successFunc: PositionCallback = ({ coords }) => {
      fetchWeatherData(coords);
    };

    const errorFunc: PositionErrorCallback = (error) => {
      alert(ERROR_MESSAGE[error.code]);
      fetchWeatherData(DEFAULT_LOCATION);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successFunc,
        errorFunc,
        POS_OPTION
      );
    } else {
      alert("Geolocation API がサポートされていません");
      fetchWeatherData(DEFAULT_LOCATION);
    }
  }, [dispatch]);

  return (
    <div>
      <TodayWeather />
    </div>
  );
};

export default WeatherApp;
