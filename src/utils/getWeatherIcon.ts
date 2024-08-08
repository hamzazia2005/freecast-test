import { weatherIconMap } from "../constant/data";
const getWeatherIcon = (
  weatherCondition: string | undefined
): string | undefined => {
  if (weatherCondition)
    return weatherIconMap[weatherCondition] || "weather-default.svg";
};

export default getWeatherIcon;
