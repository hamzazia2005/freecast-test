import React from "react";
import {
  CitiesContainer,
  CityButton,
  CityWrapper,
} from "../../views/home/style";

interface CityButtonsProps {
  shuffledCities: string[];
  cityActiveIndex: number | null;
  setCityItemIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setIsWeatherShow: React.Dispatch<React.SetStateAction<boolean>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
}

const CityButtons: React.FC<CityButtonsProps> = ({
  shuffledCities,
  cityActiveIndex,
  setCityItemIndex,
  setIsWeatherShow,
  setCity,
}) => {
  return (
    <CityWrapper>
      <CitiesContainer>
        {shuffledCities.map((city, index) => (
          <CityButton
            isActive={index === cityActiveIndex}
            onClick={() => {
              setIsWeatherShow(true);
              setCityItemIndex(index);
              setCity(city);
            }}
            key={index}
          >
            {city}
          </CityButton>
        ))}
      </CitiesContainer>
    </CityWrapper>
  );
};

export default CityButtons;
