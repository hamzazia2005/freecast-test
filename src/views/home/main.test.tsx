import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Main from "./main";
import { useSearchCityStore } from "../../store/store";

jest.mock("../../components/weatherCard/index", () => (props: any) => (
  <div data-testid="weather-card" {...props}>
    Mocked WeatherCard
  </div>
));

interface MockSearchCityStore {
  searchCity: string | null;
}

const mockUseSearchCityStore = (searchCity: string | null) => {
  return {
    searchCity,
  } as MockSearchCityStore;
};

jest.mock("../../store/store", () => ({
  useSearchCityStore: jest.fn() as unknown as typeof useSearchCityStore,
}));

describe("Main Component", () => {
  const mockSetCity = jest.fn();
  const mockSetIsWeatherShow = jest.fn();
  const mockSetIsBtnActive = jest.fn();

  beforeEach(() => {
    mockSetCity.mockClear();
    mockSetIsWeatherShow.mockClear();
    mockSetIsBtnActive.mockClear();
  });

  test("calls setCity and setIsWeatherShow when searchCity changes", () => {
    (useSearchCityStore as unknown as jest.Mock).mockReturnValue(
      mockUseSearchCityStore("Los Angeles")
    );

    render(
      <Main
        isModalOpen={false}
        city=""
        setCity={mockSetCity}
        isWeatherShow={false}
        setIsWeatherShow={mockSetIsWeatherShow}
        isBtnActive={0}
        setIsBtnActive={mockSetIsBtnActive}
      />
    );

    expect(mockSetCity).toHaveBeenCalledWith("Los Angeles");
    expect(mockSetIsWeatherShow).toHaveBeenCalledWith(true);
  });
});
