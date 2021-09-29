import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveWeatherData } from "../action/weather";
import { saveLocationData } from "../action/location";
import type { FormEvent } from "react";
import { isSearchOff } from "../action/isSearch";
import styled from "styled-components";

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
      dispatch(
        saveWeatherData({
          [locationData.data[0].title]: weatherData.data.consolidated_weather,
        })
      );
    } catch (e) {
      alert(e);
    }
  };

  return (
    <SearchContainer>
      <SearchHeader>
        <CloseButton
          onClick={() => {
            dispatch(isSearchOff());
          }}
        >
          <span className="material-icons">close</span>
        </CloseButton>
      </SearchHeader>
      <SearchForm onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="search location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <input type="submit" value="Search" />
      </SearchForm>
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  padding: 20px 46px;
`;

const SearchHeader = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: transparent;
  color: #e7e7eb;
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
`;

export default SearchLocation;
