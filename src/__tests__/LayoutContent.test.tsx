import { screen } from "@testing-library/react";
import LayoutContent from "../components/LayoutContent";
import { renderWithMemoryRouter } from "./utils/renderWithRouter";
import { SelectedCityProvider } from "../contexts/SelectedCityContext";

jest.mock("../services/OpenWeatherApi", () => ({
  getCities: jest.fn(),
}));

describe("<LayoutContent />", () => {
  it("should render HomePage when navigated to /, represented by a select", () => {
    renderWithMemoryRouter(
      <SelectedCityProvider>
        <LayoutContent />
      </SelectedCityProvider>,
      "/"
    );

    const selectElement = screen.getByRole("combobox");

    expect(selectElement).toBeInTheDocument();
  });

  it("should render AboutPage when navigated to /about, represented by two anchors", () => {
    renderWithMemoryRouter(<LayoutContent />, "/about");

    const anchorsElements = screen.getAllByRole("link");

    expect(anchorsElements).toHaveLength(2);
  });
});
