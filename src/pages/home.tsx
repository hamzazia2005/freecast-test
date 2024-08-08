import React from "react";
import Main from "../views/home/main";

interface HomeProps {
  city: string;
  setCity: (city: string) => void;
  isWeatherShow: boolean;
  setIsWeatherShow: (show: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isBtnActive: number;
  setIsBtnActive: (index: number) => void;
}

const Home: React.FC<HomeProps> = ({
  city,
  setCity,
  isWeatherShow,
  setIsWeatherShow,
  isModalOpen,
  setIsModalOpen,
  isBtnActive,
  setIsBtnActive,
}) => {
  return (
    <Main
      isModalOpen={isModalOpen}
      city={city}
      setCity={setCity}
      isWeatherShow={isWeatherShow}
      setIsWeatherShow={setIsWeatherShow}
      isBtnActive={isBtnActive}
      setIsBtnActive={setIsBtnActive}
    />
  );
};

export default Home;
