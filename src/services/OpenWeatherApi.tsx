export const getCities = async (value: string) => {
  const axios = require("axios");

  return axios.get(
    `https://api.openweathermap.org/data/2.5/find?q=${value}&units=metric&appid=b6432528466c2ddd5717e9a9ae56b0f9&lang=en`
  );
};
