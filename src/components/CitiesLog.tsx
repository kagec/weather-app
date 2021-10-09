import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentWoeid } from "../action/entities";
import { isSearchOff } from "../action/isSearch";
import { Button } from "./styled-components/styledButton";

const CitiesLog = () => {
  const citiesLogs: { [key: string]: number } = useSelector(
    (state) => state.entities.locations.logs
  );
  const dispatch = useDispatch();
  const cities = Object.keys(citiesLogs);

  return (
    <CitiesLogList>
      {cities.map((city, index) => (
        <li key={index}>
          <CityButton
            onClick={() => {
              dispatch(selectCurrentWoeid(citiesLogs[city]));
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
