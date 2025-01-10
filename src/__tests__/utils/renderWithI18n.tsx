import React from "react";
import { render, RenderResult } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

const renderWithI18n = (ui: React.ReactElement): RenderResult => {
  i18n.changeLanguage("en");

  return render(<I18nextProvider i18n={i18n}>{ui}</I18nextProvider>);
};

export default renderWithI18n;
