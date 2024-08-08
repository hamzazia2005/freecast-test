import { create } from "zustand";

interface WeatherStore {
  isFiveDay: boolean;
  toggleForecast: () => void;
}
export type WeatherUnit = "imperial" | "metric" | "standard";
export type TimeFormat = "AM/PM" | "24h";

type WeatherUnitState = {
  unit: WeatherUnit;
  setUnit: (unit: WeatherUnit) => void;
};

type TimeFormatState = {
  format: TimeFormat;
  setFormat: (format: TimeFormat) => void;
};

type SearchCityState = {
  searchCity: string;
  setSearchCity: (searchCity: string) => void;
};

export const useWeatherStore = create<WeatherStore>((set) => ({
  isFiveDay: false,
  toggleForecast: () => set((state) => ({ isFiveDay: !state.isFiveDay })),
}));

export const useWeatherUnitStore = create<WeatherUnitState>((set) => ({
  unit: "metric",
  setUnit: (unit: WeatherUnit) => set({ unit }),
}));

export const useTimeFormatStore = create<TimeFormatState>((set) => ({
  format: "24h",
  setFormat: (format: TimeFormat) => set({ format }),
}));

export const useSearchCityStore = create<SearchCityState>((set) => ({
  searchCity: "",
  setSearchCity: (searchCity: string) => set({ searchCity }),
}));
