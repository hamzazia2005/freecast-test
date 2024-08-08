import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./home";
import Main from "../views/home/main";

jest.mock("../views/home/main", () => (props: any) => (
  <div data-testid="main-component" {...props}>
    Mocked Main Component
  </div>
));

describe("Home Component", () => {
  const mockSetCity = jest.fn();
  const mockSetIsWeatherShow = jest.fn();
  const mockSetIsModalOpen = jest.fn();
  const mockSetIsBtnActive = jest.fn();

  beforeEach(() => {
    mockSetCity.mockClear();
    mockSetIsWeatherShow.mockClear();
    mockSetIsModalOpen.mockClear();
    mockSetIsBtnActive.mockClear();
  });

  test("renders Main component with correct props", () => {
    const { getByTestId } = render(
      <Home
        city="New York"
        setCity={mockSetCity}
        isWeatherShow={true}
        setIsWeatherShow={mockSetIsWeatherShow}
        isModalOpen={false}
        setIsModalOpen={mockSetIsModalOpen}
        isBtnActive={1}
        setIsBtnActive={mockSetIsBtnActive}
      />
    );

    const mainComponent = getByTestId("main-component");

    expect(mainComponent).toBeInTheDocument();
    expect(mainComponent).toHaveAttribute("city", "New York");
    expect(mainComponent).toHaveAttribute("isBtnActive", "1");
  });
});
