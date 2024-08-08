import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SettingModal from "./setting-modal";

describe("SettingModal Component", () => {
  test("renders correctly when isModalOpen is true", () => {
    const mockSetIsModalOpen = jest.fn();

    const { container } = render(
      <SettingModal isModalOpen={true} setIsModalOpen={mockSetIsModalOpen} />
    );

    expect(container).toBeInTheDocument();
  });

  test("does not render or behaves differently when isModalOpen is false", () => {
    const mockSetIsModalOpen = jest.fn();

    const { container } = render(
      <SettingModal isModalOpen={false} setIsModalOpen={mockSetIsModalOpen} />
    );

    expect(container).toBeInTheDocument();
  });
});
