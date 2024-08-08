import styled from "styled-components";

interface ButtonInterface {
  isActive: boolean;
}
interface AppContainerInterface {
  isModalOpen: boolean;
}

export const Wrapper = styled.div`
  width: 100%;
`;

export const AppContainer = styled.div<AppContainerInterface>`
  background-color: #000;
  color: #fff;
  padding: 20px;
`;

export const MainWrapper = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WeatherContainer = styled.div`
  margin: 20px 0;
  gap: 20px;
  margin-top: 70px;
`;

export const WeatherContainerCurrent = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
  margin-top: 70px;
`;

export const WeekImgWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  text-align: center;
`;

export const WeatherHeading = styled.div`
  width: 100%;
  font-size: 20px;
  text-align: center;
  font-weight: 600;
`;

export const WeatherCelsius = styled.span`
  font-size: 20px;
  color: white;
  font-weight: 400;
`;

export const WeekMain = styled.div`
  text-align: center;
  margin-top: 20px;
  min-width: 200px;
  overflow: hidden;
`;

export const WeatherInfo = styled.div`
  margin-top: 18px;
  display: grid;
  height: 120px;
`;

export const Forecast = styled.div`
  display: flex;
  gap: 10px;
  margin: 5px 0;
  text-align: center;
  justify-content: center;
`;

export const CityWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CitiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 15px;
  position: absolute;
  bottom: 10vh;
`;

export const CityButton = styled.button<ButtonInterface>`
  background-color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  color: ${({ isActive }) => (isActive ? "#6dadff" : "#fff")};
  border: 2px solid #1e4eba;
  padding: 15px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  width: 200px;
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
  &:hover {
    background-color: #fff;
    color: #6dadff;
  }
  &.active {
    background-color: #333;
  }
`;

export const MainImgWrapper = styled.div`
  text-align: center;
`;

export const MainWeatherImg = styled.img`
  width: 100px;
  height: 100px;
`;

export const DaysButton = styled.button<ButtonInterface>`
  border: ${({ isActive }) =>
    isActive ? "2px solid #fff" : "2px solid #1e4eba"};
  cursor: pointer;
  font-weight: 600;

  padding: 5px 35px;
  border-radius: 8px;
  background: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  color: ${({ isActive }) => (isActive ? "#6dadff" : "#fff")};
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #6dadff;
  }
`;

export const WeatherLabelMain = styled.span`
  font-size: 20px;
  color: white;
  font-weight: 600;
  display: grid;
`;

export const WeatherLabel = styled.span`
  font-size: 16px;
  color: lightgray;
  font-weight: 500;
  text-align: start;
`;

export const Heading = styled.span`
  font-size: 16px;
  padding-top: 35px;
  display: grid;
  text-align: center;
  font-weight: 500;
`;

export const SelectCityHeading = styled.p`
  font-size: 28px;
  text-align: center;
`;
