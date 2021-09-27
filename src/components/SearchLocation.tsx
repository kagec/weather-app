import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveWeatherData } from "../action/weather";
import { saveLocationData } from "../action/location";
import type { FormEvent } from "react";

const SearchLocation = () => {
  const [location, setLocation] = useState<string>("");
  const dispatch = useDispatch();

  const onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (
    e
  ) => {
    e.preventDefault();

    try {
      const locationData = await axios.get(
        `/api/location/search/?query=${location}`
      );
      dispatch(saveLocationData(locationData.data[0]));

      const weatherData = await axios.get(
        `/api/location/${locationData?.data[0]?.woeid}`
      );
      dispatch(saveWeatherData(weatherData.data.consolidated_weather));
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="search location"
        onChange={(e) => setLocation(e.target.value)}
      />
      <input type="submit" value="Search" />
    </form>
  );
};

export default SearchLocation;
