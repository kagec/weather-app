import styled from "styled-components";
import { Button } from "./styled-components/styledButton";

const ChangeDegree = () => {
  return (
    <ChangeDegreeContainer>
      <CelsiusButton>℃</CelsiusButton>
      <FahrenheitButton>℉</FahrenheitButton>
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
