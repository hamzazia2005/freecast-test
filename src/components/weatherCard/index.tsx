import React, { useEffect } from "react";
import {
  DaysButton,
  Forecast,
  Heading,
  MainImgWrapper,
  MainWeatherImg,
  SelectCityHeading,
  WeatherContainer,
  WeatherContainerCurrent,
  WeatherInfo,
  WeatherLabel,
  WeatherLabelMain,
} from "../../views/home/style";
import { TOGGLE_CITY_BTNS } from "../../constant/data";
import { useQuery } from "@tanstack/react-query";
import { useWeatherStore } from "../../store/store";
import { fetchCurrentWeather } from "../../api/api";
import convertTimestampToTime from "../../utils/convertTimeStamp";
import getWeatherIcon from "../../utils/getWeatherIcon";
import { useWeatherUnitStore } from "../../store/store";
import unitSymbol from "../../utils/getUnit";
import { useNavigate } from "react-router-dom";

interface WeatherCardProps {
  isWeatherShow: boolean;
  city: string;
  isBtnActive: number;
  setIsBtnActive: (index: number) => void;
}

interface WeatherData {
  weather: { main: string }[];
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  isWeatherShow,
  isBtnActive,
  setIsBtnActive,
}) => {
  const navigate = useNavigate();
  const { unit } = useWeatherUnitStore();
  const toggleForecast = useWeatherStore((state) => state.toggleForecast);

  const {
    data: currentWeather,
    isLoading: currentLoading,
    isError: currentError,
  } = useQuery<WeatherData>({
    queryKey: ["currentWeather", city, unit],
    queryFn: () => fetchCurrentWeather(city, unit),
    enabled: Boolean(city),
  });

  useEffect(() => {
    setIsBtnActive(0);
  }, [setIsBtnActive]);

  if (currentLoading) {
    return <div>Loading...</div>;
  }

  if (currentError) {
    return <div>Error fetching weather data</div>;
  }

  return (
    <div>
      {isWeatherShow ? (
        <>
          <WeatherContainerCurrent>
            <MainImgWrapper>
              <WeatherLabelMain>{city}</WeatherLabelMain>
              <MainWeatherImg
                src={getWeatherIcon(currentWeather?.weather[0].main)}
                alt={currentWeather?.weather[0].main}
              />
              <WeatherLabelMain>
                {currentWeather?.weather[0].main}
              </WeatherLabelMain>
            </MainImgWrapper>
            <WeatherInfo>
              <WeatherLabel>
                Temp: {currentWeather?.main.temp}
                {unitSymbol(unit.toLowerCase())}
              </WeatherLabel>
              <WeatherLabel>
                Feels Like: {currentWeather?.main.feels_like}
                {unitSymbol(unit.toLowerCase())}
              </WeatherLabel>
              <WeatherLabel>
                Humidity: {currentWeather?.main.humidity}%
              </WeatherLabel>
              <WeatherLabel>
                Sunrise: {convertTimestampToTime(currentWeather?.sys.sunrise)}
              </WeatherLabel>
              <WeatherLabel>
                Sunset: {convertTimestampToTime(currentWeather?.sys.sunset)}
              </WeatherLabel>
            </WeatherInfo>
          </WeatherContainerCurrent>

          <Heading>Forecast</Heading>

          <Forecast>
            {TOGGLE_CITY_BTNS.map((item, index) => (
              <DaysButton
                key={index}
                isActive={index === isBtnActive}
                onClick={() => {
                  toggleForecast();
                  setIsBtnActive(index);
                  navigate(item.url);
                }}
              >
                {item.label}
              </DaysButton>
            ))}
          </Forecast>
        </>
      ) : (
        <SelectCityHeading>
          Pick a city to see the full forecast
        </SelectCityHeading>
      )}
    </div>
  );
};

export default WeatherCard;
