import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { saveWeatherData } from "../action/weather";
import { saveLocationData } from "../action/location";
import type { FormEvent } from "react";
import { isSearchOff } from "../action/isSearch";
import styled from "styled-components";
import searchImage from "../image/search_black_24dp.svg";
import CitiesLog from "./CitiesLog";

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
        <SearchInput
          type="text"
          placeholder="search location"
          onChange={(e) => setLocation(e.target.value)}
        />
        <SubmitButton type="submit">Search</SubmitButton>
      </SearchForm>
      <CitiesLog />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  padding: 12px 46px;
`;

const SearchHeader = styled.header`
  display: flex;
  justify-content: flex-end;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: transparent;
  color: #e7e7eb;

  > span {
    font-size: 30px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
`;

const SearchInput = styled.input`
  width: 268px;
  height: 48px;
  background-color: #1e213a;
  border: 1px solid #e7e7eb;
  border-radius: 0;

  ::placeholder {
    background: url(${searchImage});
    background-repeat: no-repeat;
    background-position: 15px 0px;
    background-size: contain;
    padding-left: 49px;
    line-height: 1.5;
    font-size: 16px;
  }
`;

const SubmitButton = styled.button`
  width: 86px;
  height: 48px;
  background: #3c47e9;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid #3c47e9;
  color: #e7e7eb;
`;

export default SearchLocation;
