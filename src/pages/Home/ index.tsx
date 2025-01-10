import React, { useState, useEffect } from "react";
import { Space } from "antd";
import { useSelectedCity } from "../../contexts/SelectedCityContext";
import { setBrighterPageLayout } from "../../utils/setBrighterPageLayout";
import CitySelect from "../../components/CitySelect";
import CityWeatherInformations from "../../components/CityWeatherInformations";
import GoBackHomeButton from "../../components/GoBackHomeButton";

const HomePage: React.FC = () => {
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const [visibleContent, setVisibleContent] = useState<string | undefined>();
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
          <CityWeatherInformations selectedCity={selectedCity} />
        </div>
      ) : (
        <CitySelect
          className={`city-select ${visibleContent}`}
          setSelectedCity={setSelectedCity}
          setVisibleContent={setVisibleContent}
        />
      )}
    </Space>
  );
};

export default HomePage;
