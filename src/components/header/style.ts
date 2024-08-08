import styled from "styled-components";

interface ButtonType {
  isActive?: boolean;
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 30px;
`;

const HeaderItem = styled.span`
  font-size: 16px;
  color: white;
  font-weight: 600;
  cursor: pointer;
`;
const FlexContainer = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 17px;
  height: 17px;
  cursor: pointer;
`;

const ModalText = styled.p`
  width: 100%;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  display: flex;
  justify-content: center;
`;

const Modaldiv = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  gap: 7px;
`;

export const ModalBtns = styled.button<ButtonType>`
  border: ${({ isActive }) =>
    isActive ? "2px solid #fff" : "2px solid #1e4eba"};

  cursor: pointer;
  font-weight: 600;

  padding: 5px 25px;
  border-radius: 8px;
  background: ${({ isActive }) => (isActive ? "#fff" : "#000")};
  color: ${({ isActive }) => (isActive ? "#6dadff" : "#fff")};
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

  &:hover {
    background-color: #fff;
    color: #6dadff;
  }
`;

const SearchInput = styled.input`
  width: 200px; /* Adjust width as needed */
  padding: 4px 8px;
  border-radius: 5px;
  border: 2px solid #6dadff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  color: white;
  &::placeholder {
    color: white;
    font-size: 14px;
  }
  background-color: transparent;
  &:focus {
    outline: none;
    border-color: #6dadff;
    box-shadow: 0 0 5px rgba(128, 189, 255, 0.5);
  }
`;

const TimeCentered = styled.div`
  text-align: center;
  padding-top: 20px;
`;

export {
  HeaderContainer,
  HeaderItem,
  FlexContainer,
  StyledImage,
  ModalText,
  Modaldiv,
  SearchInput,
  TimeCentered,
};
