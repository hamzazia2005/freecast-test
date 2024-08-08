import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Header from "./index";
import {
  useSearchCityStore,
  useWeatherUnitStore,
  useTimeFormatStore,
} from "../../store/store";

jest.mock("../../store/store");

describe("Header Component", () => {
  const mockUseSearchCityStore = useSearchCityStore as jest.MockedFunction<
    typeof useSearchCityStore
  >;
  const mockUseWeatherUnitStore = useWeatherUnitStore as jest.MockedFunction<
    typeof useWeatherUnitStore
  >;
  const mockUseTimeFormatStore = useTimeFormatStore as jest.MockedFunction<
    typeof useTimeFormatStore
  >;

  beforeEach(() => {
    mockUseSearchCityStore.mockReturnValue({
      searchCity: "",
      setSearchCity: jest.fn(),
    });

    mockUseWeatherUnitStore.mockReturnValue({
      unit: "metric",
      setUnit: jest.fn(),
    });

    mockUseTimeFormatStore.mockReturnValue({
      format: "24h",
      setFormat: jest.fn(),
    });
  });

  test("renders Header component", async () => {
    const { findByText } = render(
      <Header isModalOpen={false} setIsModalOpen={jest.fn()} />
    );
    expect(await findByText(/search/i)).toBeInTheDocument();
    expect(await findByText(/settings/i)).toBeInTheDocument();
  });

  test("invalid city name alerts user", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation();
    const { findByText, findByPlaceholderText } = render(
      <Header isModalOpen={false} setIsModalOpen={jest.fn()} />
    );
    const user = userEvent.setup();

    const searchButton = await findByText(/search/i);
    await user.click(searchButton);

    const searchInput = await findByPlaceholderText(/search/i);
    expect(searchInput).toBeInTheDocument();

    await user.type(searchInput, "InvalidCity{enter}");

    expect(alertMock).toHaveBeenCalledWith("Invalid city name");
    alertMock.mockRestore();
  });
});
