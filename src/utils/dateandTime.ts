import { TimeFormat } from "../store/store";
export const getDate = (format: TimeFormat) => {
  const date = new Date();
  let hours = date.getHours();
  const minutes = date.getMinutes();
  let period = "";

  if (format === "AM/PM") {
    period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
  }

  return {
    hours: format === "24h" ? hours : `${hours}`,
    minutes: minutes < 10 ? `0${minutes} ${period}` : `${minutes} ${period}`,
  };
};
