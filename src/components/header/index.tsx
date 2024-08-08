import React, { useState } from "react";
import {
  HeaderContainer,
  HeaderItem,
  FlexContainer,
  StyledImage,
  ModalText,
  Modaldiv,
  ModalBtns,
  SearchInput,
  TimeCentered,
} from "./style";
import Container from "../../styles/globalStyles";
import SettingModal from "../../views/home/setting-modal";
import { getDate } from "../../utils/dateandTime";
import Modal from "../modal/index";
import { UNITS_BTN, UNITS_TIME } from "../../constant/data";
import {
  TimeFormat,
  WeatherUnit,
  useTimeFormatStore,
  useWeatherUnitStore,
} from "../../store/store";
import { useSearchCityStore } from "../../store/store";
import { CITIES } from "../../constant/data";

interface HeaderProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Settings {
  unit: WeatherUnit;
  time: TimeFormat;
}

const Header: React.FC<HeaderProps> = ({ isModalOpen, setIsModalOpen }) => {
  const { searchCity, setSearchCity } = useSearchCityStore();
  const { setUnit, unit } = useWeatherUnitStore();
  const { setFormat, format } = useTimeFormatStore();

  const [settings, setSettings] = useState<Settings>({
    unit,
    time: format,
  });

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
    setSettings({
      unit,
      time: format,
    });
  };

  const { hours, minutes } = getDate(format);
  const [isSearchShow, setIsSearchShow] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const searchedCity = e.currentTarget.value;
    if (e.key === "Enter" && searchedCity) {
      const isExists = CITIES.some(
        (city) => city.toLowerCase() === searchedCity.toLowerCase()
      );
      if (isExists) {
        setSearchCity(searchedCity);
      } else {
        alert("Invalid city name");
      }
    }
  };

  return (
    <>
      <Container>
        <HeaderContainer>
          <HeaderItem>
            {hours}:{minutes}
          </HeaderItem>
          <FlexContainer>
            {isSearchShow ? (
              <SearchInput
                type="search"
                placeholder="Search"
                onKeyDown={handleKeyDown}
              />
            ) : (
              <HeaderItem onClick={() => setIsSearchShow(true)}>
                Search
              </HeaderItem>
            )}
            <HeaderItem onClick={handleModalOpen}>Settings</HeaderItem>
            <SettingModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <StyledImage
              src="/assets/theme-switch-icon.svg"
              alt="Theme Switch Icon"
            />
          </FlexContainer>
        </HeaderContainer>
      </Container>
      <Modal
        isModalOpen={isModalOpen}
        onClose={handleModalOpen}
        title="Settings"
      >
        <>
          <ModalText>Units</ModalText>
          <Modaldiv>
            {UNITS_BTN.map((label, index) => (
              <ModalBtns
                key={index}
                isActive={label.toLowerCase() === settings.unit.toLowerCase()}
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    unit: label as WeatherUnit,
                  }))
                }
              >
                {label}
              </ModalBtns>
            ))}
          </Modaldiv>
          <br />
          <ModalText>Time</ModalText>
          <Modaldiv>
            {UNITS_TIME.map((label, index) => (
              <ModalBtns
                key={index}
                isActive={label === settings.time}
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    time: label as TimeFormat,
                  }))
                }
              >
                {label}
              </ModalBtns>
            ))}
          </Modaldiv>
          <br />
          <Modaldiv>
            <ModalBtns onClick={handleModalOpen}>Cancel</ModalBtns>
            <ModalBtns
              onClick={() => {
                setIsModalOpen((prev) => !prev);
                setUnit(settings.unit);
                setFormat(settings.time);
              }}
            >
              Save
            </ModalBtns>
          </Modaldiv>
          <TimeCentered>
            <HeaderItem>
              {hours}:{minutes}
            </HeaderItem>
          </TimeCentered>
        </>
      </Modal>
    </>
  );
};

export default Header;
