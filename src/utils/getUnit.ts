const unitSymbol = (unit: string) =>
  unit === "metric" ? "°C" : unit === "imperial" ? "°F" : "K";
export default unitSymbol;
