import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchCurrentWeather = async (city: string, unit: string) => {
  const response = await axios.get(
    `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  return response.data;
};

export const fetchFiveDayWeather = async (city: string, unit: string) => {
  const getDayName = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
  );
  return response.data;
};
