import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { useSelectedCity } from "../../contexts/SelectedCityContext";
import { setBrighterPageLayout } from "../../utils/setBrighterPageLayout";
import CitySelect from "../../components/CitySelect";
import CityWeatherInformations from "../../components/CityWeatherInformations";
import GoBackHomeButton from "../../components/GoBackHomeButton";

const HomePage: React.FC = () => {
  const { i18n } = useTranslation();
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const [visibleContent, setVisibleContent] = useState<string | undefined>();

  const currentLanguageIsPortuguese = i18n.language === "pt";
  const hasSelectedCity = selectedCity && Object.keys(selectedCity)?.length > 0;

  useEffect(() => {
    setTimeout(() => setVisibleContent("visible"), 100);

    if (hasSelectedCity) {
      setBrighterPageLayout();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setVisibleContent("visible"), 100);
  }, [selectedCity]);

  return (
    <Space className={`home-page-container ${visibleContent}`}>
      {hasSelectedCity ? (
        <div className={"home-page-informations-container"}>
          <GoBackHomeButton
            setVisibleContent={setVisibleContent}
            setSelectedCity={setSelectedCity}
          />
          <CityWeatherInformations
            selectedCity={selectedCity}
            currentLanguageIsPortuguese={currentLanguageIsPortuguese}
          />
        </div>
      ) : (
        <CitySelect
          className={`city-select ${visibleContent}`}
          setSelectedCity={setSelectedCity}
          setVisibleContent={setVisibleContent}
          currentLanguageIsPortuguese={currentLanguageIsPortuguese}
        />
      )}
    </Space>
  );
};

export default HomePage;
