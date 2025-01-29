import { screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderWithI18n from "./utils/renderWithI18n";
import LayoutHeader from "../components/LayoutHeader";
import i18n from "../i18n";
import { resetPageStyle } from "../utils/resetPageLayout";

jest.mock("../utils/resetPageLayout", () => ({ resetPageStyle: jest.fn() }));

function renderWithMemoryRouter() {
  renderWithI18n(
    <MemoryRouter>
      <LayoutHeader />
    </MemoryRouter>
  );
}

describe("<LayoutHeader />", () => {
  test("it should render four anchors", () => {
    renderWithMemoryRouter();

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(4);
  });

  test("it should changes language to pt-br when clicking BR flag", () => {
    renderWithMemoryRouter();

    const brFlag = screen.getByRole("link", { name: /br/i });
    fireEvent.click(brFlag);

    expect(i18n.language).toBe("pt");
  });

  test("it should changes language to en when clicking US flag", () => {
    renderWithMemoryRouter();

    const usFlag = screen.getByRole("link", { name: /us/i });
    fireEvent.click(usFlag);

    expect(i18n.language).toBe("en");
  });

  test("it should call resetPageStyle mock when clicking on about link", () => {
    renderWithMemoryRouter();

    const aboutLink = screen.getByRole("link", { name: /about/i });
    fireEvent.click(aboutLink);

    expect(resetPageStyle).toHaveBeenCalled();
  });
});
