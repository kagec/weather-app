import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { changeDegreeToCelsius, changeDegreeToFahrenheit } from "../action/ui";
import { Button } from "./styled-components/styledButton";

const ChangeDegree = () => {
  const dispatch = useDispatch();
  const isFahrenheit: boolean = useSelector((state) => state.ui.isFahrenheit);

  return (
    <ChangeDegreeContainer>
      <Button onClick={() => dispatch(changeDegreeToCelsius())}>℃</Button>
      <Button onClick={() => dispatch(changeDegreeToFahrenheit())}>℉</Button>
    </ChangeDegreeContainer>
  );
};

const ChangeDegreeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CelsiusButton = styled(Button)<{ isFahrenheit: boolean }>`
  width: 40px;
  height: 40px;
  font-weight: 700;
  font-size: 18px;
  border-radius: 50px;
  border-color: transparent;

  ${({ isFahrenheit }) => css`
    ${isFahrenheit
      ? `
      color: #E7E7EB;
      background-color: #585676;
      `
      : `
      color: #110e3c;
      background: #e7e7eb;
   `}
  `}
`;

const FahrenheitButton = styled(Button)<{ isFahrenheit: boolean }>`
  width: 40px;
  height: 40px;
  font-weight: 700;
  font-size: 18px;
  border-radius: 50px;
  border-color: transparent;
  margin-left: 12px;

  ${({ isFahrenheit }) => css`
    ${isFahrenheit
      ? `
      color: #110e3c;
      background: #e7e7eb;
      `
      : `
      color: #E7E7EB;
      background-color: #585676;
   `}
  `}
`;

export default ChangeDegree;
