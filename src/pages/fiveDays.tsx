import React, { useEffect } from "react";
import {
  DaysButton,
  Forecast,
  Heading,
  MainWeatherImg,
  MainWrapper,
  SelectCityHeading,
  WeatherCelsius,
  WeatherContainer,
  WeatherHeading,
  WeatherLabelMain,
  WeekImgWrapper,
  WeekMain,
} from "../views/home/style";
import { useQuery } from "@tanstack/react-query";
import {
  useWeatherUnitStore,
  useWeatherStore,
  useSearchCityStore,
} from "../store/store";
import { fetchFiveDayWeather } from "../api/api";
import getWeatherIcon from "../utils/getWeatherIcon";
import unitSymbol from "../utils/getUnit";
import getDayName from "../utils/getDay";
import { TOGGLE_CITY_BTNS } from "../constant/data";
import { useNavigate } from "react-router-dom";

interface FiveDaysProps {
  city: string;
  setCity: (city: string) => void;
  setIsWeatherShow: (show: boolean) => void;
  isWeatherShow: boolean;
  isBtnActive: number;
  setIsBtnActive: (index: number) => void;
}

interface WeatherData {
  dt: number;
  weather: { main: string }[];
  main: { temp_max: number; temp_min: number };
}

const FiveDays: React.FC<FiveDaysProps> = ({
  city,
  setCity,
  setIsWeatherShow,
  isWeatherShow,
  isBtnActive,
  setIsBtnActive,
}) => {
  const navigate = useNavigate();
  const { searchCity } = useSearchCityStore();
  const { unit } = useWeatherUnitStore();
  const uniqueDays: { [key: string]: WeatherData } = {};

  useEffect(() => {
    if (searchCity) {
      setCity(searchCity as string);
      setIsWeatherShow(true);
    }
  }, [searchCity, setCity, setIsWeatherShow]);

  const {
    data: fiveDayWeather,
    isLoading: fiveDayLoading,
    isError: fiveDayError,
  } = useQuery({
    queryKey: ["fiveDayWeather", city, unit],
    queryFn: () => fetchFiveDayWeather(city, unit),
    enabled: Boolean(city),
  });

  const toggleForecast = useWeatherStore((state) => state.toggleForecast);

  const fiveDayForecast: WeatherData[] =
    fiveDayWeather?.list
      .filter((weather: WeatherData) => {
        const date = new Date(weather.dt * 1000);
        const day = date.toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "numeric",
          year: "numeric",
        });
        if (!uniqueDays[day]) {
          uniqueDays[day] = weather;
          return true;
        }
        return false;
      })
      .slice(0, 5) || [];

  useEffect(() => {
    setIsBtnActive(1);
  }, [setIsBtnActive]);

  if (fiveDayLoading) {
    return <div>Loading...</div>;
  }

  if (fiveDayError) {
    return <div>Error fetching weather data</div>;
  }

  return (
    <>
      <MainWrapper>
        <div>
          <WeatherContainer>
            <WeatherHeading>{city}</WeatherHeading>

            <WeekImgWrapper>
              {fiveDayForecast.length > 0 ? (
                fiveDayForecast.map((item: WeatherData, i: number) => (
                  <WeekMain key={i}>
                    <WeatherLabelMain>{getDayName(item.dt)}</WeatherLabelMain>
                    <MainWeatherImg
                      src={getWeatherIcon(item.weather[0].main)}
                      alt={item.weather[0].main}
                    />
                    <WeatherLabelMain>{item.weather[0].main}</WeatherLabelMain>
                    <WeatherCelsius>
                      {`H:${item.main.temp_max}${unitSymbol(
                        unit.toLowerCase()
                      )}/L:${item.main.temp_min}${unitSymbol(
                        unit.toLowerCase()
                      )}`}
                    </WeatherCelsius>
                  </WeekMain>
                ))
              ) : (
                <SelectCityHeading>
                  Pick a city to see the full forecast
                </SelectCityHeading>
              )}
            </WeekImgWrapper>
          </WeatherContainer>
          {isWeatherShow && (
            <>
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
          )}
        </div>
      </MainWrapper>
    </>
  );
};

export default FiveDays;
