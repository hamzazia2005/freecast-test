import styled from "styled-components";

export const ModalWrapper = styled.div`
  background: black;
  padding: 20px 20px;
  border: 3px solid #1e4eba;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
`;

export const ModalHeader = styled.span`
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  font-size: 26px;
  display: flex;
  justify-content: center;
`;

export const ModalBody = styled.div`
  padding: 10px 0;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: -1;
  }
`;
