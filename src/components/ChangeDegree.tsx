import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeDegreeToCelsius, changeDegreeToFahrenheit } from "../action/ui";
import { Button } from "./styled-components/styledButton";

export const CelsiusToFahrenheit: (degree: number) => number = (
  degree: number
) => degree * 1.8 + 32;

export const getChangedDegree: (
  isFahrenheit: boolean,
  degree: number
) => number = (isFahrenheit, degree) => {
  if (isFahrenheit) {
    return Math.round(CelsiusToFahrenheit(Math.round(degree)));
  } else {
    return Math.round(degree);
  }
};

export const getDegreeTypeChar: (isFahrenheit: boolean) => string = (
  isFahrenheit
) => (isFahrenheit ? "℉" : "℃");

const ChangeDegree = () => {
  const dispatch = useDispatch();

  return (
    <ChangeDegreeContainer>
      <CelsiusButton onClick={() => dispatch(changeDegreeToCelsius())}>
        ℃
      </CelsiusButton>
      <FahrenheitButton onClick={() => dispatch(changeDegreeToFahrenheit())}>
        ℉
      </FahrenheitButton>
    </ChangeDegreeContainer>
  );
};

const ChangeDegreeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CelsiusButton = styled(Button)`
  width: 40px;
  height: 40px;
  font-weight: 700;
  font-size: 18px;
  color: #110e3c;
  background: #e7e7eb;
  border-radius: 50px;
  border-color: transparent;
`;

const FahrenheitButton = styled(Button)`
  width: 40px;
  height: 40px;
  font-weight: 700;
  font-size: 18px;
  background: #585676;
  border-radius: 50px;
  border-color: transparent;
  margin-left: 12px;
`;

export default ChangeDegree;
