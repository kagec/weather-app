import axios from "axios";
import { useEffect } from "react";

axios.defaults.baseURL = "https://www.metaweather.com";

const optionObj: PositionOptions = {
  enableHighAccuracy: false,
  timeout: 3000,
  maximumAge: 0,
};

const ERROR_MESSAGE: { [key: number]: string } = {
  0: "原因不明のエラーが発生しました…。",
  1: "位置情報の取得が許可されませんでした…。",
  2: "電波状況などで位置情報が取得できませんでした…。",
  3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。",
};

const WeatherApp = () => {
  useEffect(() => {
    const successFunc: PositionCallback = ({ coords }) => {};

    const errorFunc: PositionErrorCallback = (error) => {
      alert(ERROR_MESSAGE[error.code]);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        successFunc,
        errorFunc,
        optionObj
      );
    } else {
      alert("Geolocation API がサポートされていません");
    }
  }, []);

  return <div></div>;
};

export default WeatherApp;
