import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import FiveDays from "./pages/fiveDays";
import Header from "./components/header";
import CityButtons from "./components/cityButtons/index";
import { CITIES } from "./constant/data";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [shuffledCities, setShuffledCities] = useState<string[]>([]);
  const [cityActiveIndex, setCityItemIndex] = useState<number | null>(null);
  const [isWeatherShow, setIsWeatherShow] = useState<boolean>(false);
  const [city, setCity] = useState<string>("");
  const [isBtnActive, setIsBtnActive] = useState<number>(3);

  const shuffleArray = (array: string[]): string[] =>
    array.sort(() => Math.random() - 0.5).slice(0, 18);

  useEffect(() => {
    setShuffledCities(shuffleArray(CITIES));
  }, []);

  return (
    <React.Fragment>
      <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                city={city}
                setCity={setCity}
                isWeatherShow={isWeatherShow}
                setIsWeatherShow={setIsWeatherShow}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                isBtnActive={isBtnActive}
                setIsBtnActive={setIsBtnActive}
              />
            }
          />
          <Route
            path="/5Days"
            element={
              <FiveDays
                city={city}
                setCity={setCity}
                isBtnActive={isBtnActive}
                setIsBtnActive={setIsBtnActive}
                setIsWeatherShow={setIsWeatherShow}
                isWeatherShow={isWeatherShow}
              />
            }
          />
        </Routes>
      </Router>
      <CityButtons
        shuffledCities={shuffledCities}
        cityActiveIndex={cityActiveIndex}
        setCityItemIndex={setCityItemIndex}
        setIsWeatherShow={setIsWeatherShow}
        setCity={setCity}
      />
    </React.Fragment>
  );
};

export default App;
