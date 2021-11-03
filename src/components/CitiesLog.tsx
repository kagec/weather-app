import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectCurrentWoeid } from "../action/entities";
import { toggleSearch } from "../action/ui";
import { Button } from "./styled-components/styledButton";
import type { Location } from "./WeatherApp";

const CitiesLog = () => {
  const [location, woeids]: [
    location: { [key: number]: Location },
    woeids: number[]
  ] = useSelector((state) => [
    state.entities.locations.byWoeid,
    state.entities.locations.woeids,
  ]);
  const dispatch = useDispatch();

  return (
    <CitiesLogList>
      {woeids.map((id) => (
        <li key={id}>
          <CityButton
            onClick={() => {
              dispatch(selectCurrentWoeid(id));
              dispatch(toggleSearch());
            }}
          >
            {location[id].title}
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
