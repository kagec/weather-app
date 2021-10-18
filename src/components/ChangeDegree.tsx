import styled from "styled-components";

const ChangeDegree = () => {
  return (
    <ChangeDegreeContainer>
      <button>℃</button>
      <button>℉</button>
    </ChangeDegreeContainer>
  );
};

const ChangeDegreeContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export default ChangeDegree;
