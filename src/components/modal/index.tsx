import React from "react";
import { ModalWrapper, ModalHeader, ModalBody, ModalOverlay } from "./style";

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  title,
  children,
}) => {
  if (!isModalOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalWrapper>
    </ModalOverlay>
  );
};

export default Modal;
