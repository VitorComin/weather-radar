import axios from "axios";

export const getCities = async (
  value: string,
  currentLanguageIsPortuguese: boolean
) => {
  return axios.get(
    `http://api.openweathermap.org/data/2.5/find?q=${value}&${
      currentLanguageIsPortuguese ? "units=metric&" : ""
    }appid=b6432528466c2ddd5717e9a9ae56b0f9&lang=en`
  );
};
