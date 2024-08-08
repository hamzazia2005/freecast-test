import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FiveDays from "./fiveDays";
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

jest.mock("../store/store", () => ({
  useWeatherUnitStore: jest.fn(),
  useWeatherStore: jest.fn(),
  useSearchCityStore: jest.fn(),
}));

jest.mock("../api/api");

const queryClient = new QueryClient();

const mockedUseWeatherUnitStore = useWeatherUnitStore as jest.MockedFunction<
  typeof useWeatherUnitStore
>;
const mockedUseWeatherStore = useWeatherStore as jest.MockedFunction<
  typeof useWeatherStore
>;
const mockedUseSearchCityStore = useSearchCityStore as jest.MockedFunction<
  typeof useSearchCityStore
>;
const mockedFetchFiveDayWeather = fetchFiveDayWeather as jest.MockedFunction<
  typeof fetchFiveDayWeather
>;

describe("FiveDays Component", () => {
  const setCity = jest.fn();
  const setIsWeatherShow = jest.fn();
  const setIsBtnActive = jest.fn();

  beforeEach(() => {
    mockedUseWeatherUnitStore.mockReturnValue({ unit: "metric" });
    mockedUseWeatherStore.mockReturnValue({ toggleForecast: jest.fn() });
    mockedUseSearchCityStore.mockReturnValue({ searchCity: "" });
    setCity.mockClear();
    setIsWeatherShow.mockClear();
    setIsBtnActive.mockClear();
  });

  const renderComponent = (props: any) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FiveDays {...props} />
        </BrowserRouter>
      </QueryClientProvider>
    );
  };

  test("renders loading state", () => {
    mockedFetchFiveDayWeather.mockReturnValue(new Promise(() => {}));
    const { getByText } = renderComponent({
      city: "New York",
      setCity,
      setIsWeatherShow,
      isWeatherShow: true,
      isBtnActive: 0,
      setIsBtnActive,
    });

    expect(getByText("Loading...")).toBeInTheDocument();
  });

  test("displays message when no city is selected", () => {
    const { getByText } = renderComponent({
      city: "",
      setCity,
      setIsWeatherShow,
      isWeatherShow: false,
      isBtnActive: 0,
      setIsBtnActive,
    });

    expect(
      getByText("Pick a city to see the full forecast")
    ).toBeInTheDocument();
  });
});
