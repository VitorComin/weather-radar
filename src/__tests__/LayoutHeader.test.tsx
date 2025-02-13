import { screen, fireEvent } from "@testing-library/react";
import LayoutHeader from "../components/LayoutHeader";
import i18n from "../i18n";
import { resetPageStyle } from "../utils/resetPageLayout";
import { renderWithMemoryRouter } from "../utils/renderWithRouter";

jest.mock("../utils/resetPageLayout", () => ({ resetPageStyle: jest.fn() }));

describe("<LayoutHeader />", () => {
  test("it should render four anchors", () => {
    renderWithMemoryRouter(<LayoutHeader />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);
  });

  test("it should changes language to pt-br when clicking BR flag", () => {
    renderWithMemoryRouter(<LayoutHeader />);

    const brFlag = screen.getByRole("link", { name: /br/i });
    fireEvent.click(brFlag);

    expect(i18n.language).toBe("pt");
  });

  test("it should changes language to en when clicking US flag", () => {
    renderWithMemoryRouter(<LayoutHeader />);

    const usFlag = screen.getByRole("link", { name: /us/i });
    fireEvent.click(usFlag);

    expect(i18n.language).toBe("en");
  });

  test("it should call resetPageStyle mock when clicking on about link", () => {
    renderWithMemoryRouter(<LayoutHeader />);

    const aboutLink = screen.getByRole("link", { name: /about/i });
    fireEvent.click(aboutLink);

    expect(resetPageStyle).toHaveBeenCalled();
  });
});
