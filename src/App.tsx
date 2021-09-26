import styled from "styled-components";
import WeatherApp from "./components/WeatherApp";

function App() {
  return (
    <AppContainer>
      <WeatherApp />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
`;

export default App;
