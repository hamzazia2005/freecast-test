import React, { useEffect } from "react";
import { AppContainer, MainWrapper } from "./style";
import WeatherCard from "../../components/weatherCard/index";
import { useSearchCityStore } from "../../store/store";

interface MainProps {
  isModalOpen: boolean;
  city: string;
  setCity: (city: string) => void;
  isWeatherShow: boolean;
  setIsWeatherShow: (show: boolean) => void;
  isBtnActive: number;
  setIsBtnActive: (index: number) => void;
}

const Main: React.FC<MainProps> = ({
  isModalOpen,
  city,
  setCity,
  isWeatherShow,
  setIsWeatherShow,
  isBtnActive,
  setIsBtnActive,
}) => {
  const { searchCity } = useSearchCityStore();

  useEffect(() => {
    if (searchCity) {
      setCity(searchCity);
      setIsWeatherShow(true);
    }
  }, [searchCity, setCity, setIsWeatherShow]);

  return (
    <AppContainer isModalOpen={isModalOpen}>
      <MainWrapper>
        <WeatherCard
          city={city}
          isWeatherShow={isWeatherShow}
          isBtnActive={isBtnActive}
          setIsBtnActive={setIsBtnActive}
        />
      </MainWrapper>
    </AppContainer>
  );
};

export default Main;
