import { MemoryRouter } from "react-router-dom";
import renderWithI18n from "./renderWithI18n";
import { ReactNode } from "react";

export function renderWithMemoryRouter(
  children: ReactNode,
  routePath?: string
) {
  renderWithI18n(
    <MemoryRouter initialEntries={[routePath || "/"]}>{children}</MemoryRouter>
  );
}
