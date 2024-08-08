import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WeatherCard from "./index";
import { useWeatherUnitStore, useWeatherStore } from "../../store/store";
import { fetchCurrentWeather } from "../../api/api";

jest.mock("../../store/store", () => ({
  useWeatherUnitStore: jest.fn(),
  useWeatherStore: jest.fn(),
}));

jest.mock("../../api/api");

const queryClient = new QueryClient();

const mockedUseWeatherUnitStore = useWeatherUnitStore as jest.MockedFunction<
  typeof useWeatherUnitStore
>;
const mockedUseWeatherStore = useWeatherStore as jest.MockedFunction<
  typeof useWeatherStore
>;
const mockedFetchCurrentWeather = fetchCurrentWeather as jest.MockedFunction<
  typeof fetchCurrentWeather
>;

describe("WeatherCard Component", () => {
  const setIsBtnActive = jest.fn();
  const toggleForecast = jest.fn();
  const setCity = jest.fn();
  const setCityItemIndex = jest.fn();
  const setIsWeatherShow = jest.fn();

  beforeEach(() => {
    mockedUseWeatherUnitStore.mockReturnValue({ unit: "metric" });
    mockedUseWeatherStore.mockReturnValue({ toggleForecast });
    setIsBtnActive.mockClear();
    toggleForecast.mockClear();
    setCity.mockClear();
    setCityItemIndex.mockClear();
    setIsWeatherShow.mockClear();
  });

  const renderComponent = (props: any) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <WeatherCard {...props} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  test("renders loading state", () => {
    mockedFetchCurrentWeather.mockReturnValue(new Promise(() => {}));
    const { getByText } = renderComponent({
      city: "New York",
      isWeatherShow: true,
      isBtnActive: 0,
      setIsBtnActive,
    });

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("displays message when no city is selected", () => {
    const { getByText } = renderComponent({
      city: "",
      isWeatherShow: false,
      isBtnActive: 0,
      setIsBtnActive,
    });

    expect(
      getByText("Pick a city to see the full forecast")
    ).toBeInTheDocument();
  });
});
