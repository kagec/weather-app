import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveWeatherData } from "../action/weather";
import { saveLocationData } from "../action/location";
import type { FormEvent } from "react";
import { isSearchOff } from "../action/isSearch";

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
    <div>
      <header>
        <button
          onClick={() => {
            dispatch(isSearchOff());
          }}
        >
          <span className="material-icons">close</span>
        </button>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="search location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  );
};

export default SearchLocation;
