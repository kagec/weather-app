import axios from "axios";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://www.metaweather.com";

type Coords = Pick<GeolocationCoordinates, "latitude" | "longitude">;

const optionObj: PositionOptions = {
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

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async (coords: Coords) => {
      try {
        const locationData = await axios.get(
          `/api/location/search/?lattlong=${coords.latitude},${coords.longitude}`
        );

        const weatherData = await axios.get(
          `/api/location/${locationData?.data[0]?.woeid}`
        );

        setWeatherData(weatherData.data);
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
        optionObj
      );
    } else {
      alert("Geolocation API がサポートされていません");
      fetchWeatherData(DEFAULT_LOCATION);
    }
  }, []);

  console.log(weatherData);
  return <div></div>;
};

export default WeatherApp;
