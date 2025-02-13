import { screen } from "@testing-library/react";
import BackgroundStars from "../components/BackgroundStars";
import renderWithI18n from "../utils/renderWithI18n";

describe("<BackgroundStars />", () => {
  test("should render three divs with correct IDs", () => {
    renderWithI18n(<BackgroundStars />);

    expect(screen.getByTestId("stars")).toBeInTheDocument();
    expect(screen.getByTestId("stars2")).toBeInTheDocument();
    expect(screen.getByTestId("stars3")).toBeInTheDocument();
  });
});
