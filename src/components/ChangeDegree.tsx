import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { changeDegreeToCelsius, changeDegreeToFahrenheit } from "../action/ui";
import { Button } from "./styled-components/styledButton";

const ChangeDegree = () => {
  const dispatch = useDispatch();
  const isFahrenheit: boolean = useSelector((state) => state.ui.isFahrenheit);

  return (
    <ChangeDegreeContainer>
      <FahrenheitButton
        onClick={() => dispatch(changeDegreeToCelsius())}
        isFahrenheit={!isFahrenheit}
      >
        ℃
      </FahrenheitButton>
      <FahrenheitButton
        onClick={() => dispatch(changeDegreeToFahrenheit())}
        isFahrenheit={isFahrenheit}
      >
        ℉
      </FahrenheitButton>
    </ChangeDegreeContainer>
  );
};

const ChangeDegreeContainer = styled.div`
  @media screen and (min-width: 1340px) {
    text-align: right;
  }

  @media screen and (max-width: 1339px) {
    display: none;
  }

  > button:not(:first-child) {
    margin-left: 12px;
  }
`;

const FahrenheitButton = styled(Button)<{ isFahrenheit: boolean }>`
  width: 40px;
  height: 40px;
  font-weight: 700;
  font-size: 18px;
  border-radius: 50px;
  border-color: transparent;

  ${({ isFahrenheit }) => css`
    ${isFahrenheit
      ? `
      color: #110e3c;
      background-color: #e7e7eb;
      `
      : `
      color: #e7e7eb;
      background-color: #585676;
   `}
  `}
`;

export default ChangeDegree;
