import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import Modal from "./index";

describe("Modal Component", () => {
  const title = "Test Modal";
  const children = <div>Modal Content</div>;
  const onClose = jest.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  test("renders Modal when isModalOpen is true", () => {
    const { getByText } = render(
      <Modal isModalOpen={true} onClose={onClose} title={title}>
        {children}
      </Modal>
    );

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText("Modal Content")).toBeInTheDocument();
  });

  test("does not render Modal when isModalOpen is false", () => {
    const { queryByText } = render(
      <Modal isModalOpen={false} onClose={onClose} title={title}>
        {children}
      </Modal>
    );

    expect(queryByText(title)).not.toBeInTheDocument();
    expect(queryByText("Modal Content")).not.toBeInTheDocument();
  });

  test("does not call onClose when clicking inside the modal content", async () => {
    const { getByText } = render(
      <Modal isModalOpen={true} onClose={onClose} title={title}>
        {children}
      </Modal>
    );

    const modalContent = getByText("Modal Content");
    const user = userEvent.setup();
    await user.click(modalContent);

    expect(onClose).not.toHaveBeenCalled();
  });
});
