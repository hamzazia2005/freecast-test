import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import CityButtons from "./index";

describe("CityButtons Component", () => {
  const shuffledCities = ["New York", "Los Angeles", "Chicago"];
  const setCityItemIndex = jest.fn();
  const setIsWeatherShow = jest.fn();
  const setCity = jest.fn();

  beforeEach(() => {
    setCityItemIndex.mockClear();
    setIsWeatherShow.mockClear();
    setCity.mockClear();
  });

  test("renders the correct number of city buttons", () => {
    const { getByText } = render(
      <CityButtons
        shuffledCities={shuffledCities}
        cityActiveIndex={null}
        setCityItemIndex={setCityItemIndex}
        setIsWeatherShow={setIsWeatherShow}
        setCity={setCity}
      />
    );

    shuffledCities.forEach((city) => {
      expect(getByText(city)).toBeInTheDocument();
    });
  });

  test("calls setCityItemIndex, setIsWeatherShow, and setCity with correct values when a city button is clicked", async () => {
    const { getByText } = render(
      <CityButtons
        shuffledCities={shuffledCities}
        cityActiveIndex={null}
        setCityItemIndex={setCityItemIndex}
        setIsWeatherShow={setIsWeatherShow}
        setCity={setCity}
      />
    );

    const user = userEvent.setup();
    await user.click(getByText("Los Angeles"));

    expect(setIsWeatherShow).toHaveBeenCalledWith(true);
    expect(setCityItemIndex).toHaveBeenCalledWith(1);
    expect(setCity).toHaveBeenCalledWith("Los Angeles");
  });
});
