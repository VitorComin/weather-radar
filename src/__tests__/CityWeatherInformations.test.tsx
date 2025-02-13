import { screen } from "@testing-library/react";
import { IOpenWeatherResponse } from "../types/types";
import CityWeatherInformations from "../components/CityWeatherInformations";
import renderWithI18n from "../utils/renderWithI18n";

jest.mock("react-animated-weather", () => () => (
  <div data-testid="mocked-weather-icon" />
));
jest.mock("../assets/icons/Icons", () => ({
  ThunderstormIcon: () => <div data-testid="mocked-thunderstorm-icon" />,
}));

const mockWeatherData: IOpenWeatherResponse = {
  coord: { lon: -46.63, lat: -23.55 },
  weather: [{ id: 800, main: "Clear", description: "clear sky", icon: "01d" }],
  base: "stations",
  main: {
    temp: 25.5,
    feels_like: 26,
    temp_min: 24,
    temp_max: 27,
    pressure: 1012,
    humidity: 60,
  },
  visibility: 10000,
  wind: { speed: 3.6, deg: 90 },
  clouds: { all: 0 },
  dt: 1691234567,
  sys: { country: "BR", sunrise: 1691200000, sunset: 1691250000 },
  timezone: -10800,
  id: 3448439,
  name: "São Paulo",
  cod: 200,
};
describe("<CityWeatherInformations />", () => {
  beforeAll(() => {
    global.matchMedia =
      global.matchMedia ||
      function () {
        return {
          matches: false,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      };
  });

  test("it should render city name - country correctly", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const cityNameAndCountryElement = screen.getByText(/São Paulo - BR/i);

    expect(cityNameAndCountryElement).toBeInTheDocument();
  });

  test("it should render temperature informations correctly", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const currentTemperature = screen.getByText(/25.5°C/);
    const feelsLikeTemperature = screen.getByText(/26°C/);
    const minimumTemperature = screen.getByText(/24°C/);
    const maximumTemperature = screen.getByText(/27°C/);

    expect(currentTemperature).toBeInTheDocument();
    expect(feelsLikeTemperature).toBeInTheDocument();
    expect(minimumTemperature).toBeInTheDocument();
    expect(maximumTemperature).toBeInTheDocument();
  });

  test("it should render humidity correctly", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const humidityInformation = screen.getByText(/60%/);

    expect(humidityInformation).toBeInTheDocument();
  });

  test("it should render pressure correctly", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const pressureInformation = screen.getByText(/1012 hPa/);

    expect(pressureInformation).toBeInTheDocument();
  });

  test("it should render wind direction", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const windDirection = screen.getByText(/90°/);

    expect(windDirection).toBeInTheDocument();
  });

  test("it should render wind speed", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const windSpeed = screen.getByText(/3.6 m\/s/);

    expect(windSpeed).toBeInTheDocument();
  });

  test("it should render mocked icon", () => {
    renderWithI18n(<CityWeatherInformations selectedCity={mockWeatherData} />);

    const mockedIcon = screen.getByTestId("mocked-weather-icon");

    expect(mockedIcon).toBeInTheDocument();
  });
});
