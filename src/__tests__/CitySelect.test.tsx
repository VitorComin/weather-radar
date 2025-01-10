import { screen } from "@testing-library/react";
import CitySelect from "../components/CitySelect";
import renderWithI18n from "./utils/renderWithI18n";
import user from "@testing-library/user-event";

jest.mock("../services/OpenWeatherApi", () => ({
  getCities: jest.fn(),
}));

describe("<CitySelect />", () => {
  const mockSetVisibleContent = jest.fn();
  const mockSetSelectedCity = jest.fn();
  const mockOnSelectCity = jest.fn();

  test("should render one select", () => {
    renderWithI18n(
      <CitySelect
        setSelectedCity={mockSetSelectedCity}
        setVisibleContent={mockSetVisibleContent}
      />
    );

    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toBeInTheDocument();
  });

  it("should search when typing on input and turn mocked value an option", async () => {
    const { getCities } = require("../services/OpenWeatherApi");

    getCities.mockResolvedValueOnce({
      data: { list: [{ id: 1, name: "Joinville", sys: { country: "BR" } }] },
    });

    renderWithI18n(
      <CitySelect
        setSelectedCity={mockSetSelectedCity}
        setVisibleContent={mockSetVisibleContent}
      />
    );

    const selectElement = screen.getByRole("combobox");
    user.click(selectElement);
    user.keyboard("test");

    const cityName = await screen.findByText(/Joinville/i);
    const cityCountry = await screen.findByText(/BR/i);

    expect(cityName).toBeInTheDocument();
    expect(cityCountry).toBeInTheDocument();
  });

  it("should call onChange when clicking an option", async () => {
    const { getCities } = require("../services/OpenWeatherApi");

    getCities.mockResolvedValueOnce({
      data: { list: [{ id: 1, name: "Joinville", sys: { country: "BR" } }] },
    });

    renderWithI18n(
      <CitySelect
        setSelectedCity={mockSetSelectedCity}
        setVisibleContent={mockSetVisibleContent}
        onChange={mockOnSelectCity}
      />
    );

    const selectElement = screen.getByRole("combobox");
    user.click(selectElement);
    user.keyboard("test");

    const optionElement = await screen.findByText(/Joinville/i);
    user.click(optionElement);

    expect(mockOnSelectCity).toHaveBeenCalled();
  });
});
