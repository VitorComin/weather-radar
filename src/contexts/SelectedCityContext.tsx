import React, { createContext, useContext, useState, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { IOpenWeatherResponse, ISelectedCityContextType } from "../types/types";

const SelectedCityContext = createContext<ISelectedCityContextType | undefined>(
  undefined
);

export const SelectedCityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCity] = useState<IOpenWeatherResponse>(
    {} as IOpenWeatherResponse
  );

  return (
    <SelectedCityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </SelectedCityContext.Provider>
  );
};

export const useSelectedCity = () => {
  const { t } = useTranslation();

  const context = useContext(SelectedCityContext);
  if (!context) {
    throw new Error(t("use_selected_city_error"));
  }
  return context;
};
