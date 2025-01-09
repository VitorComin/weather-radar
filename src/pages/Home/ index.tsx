import React, { useState, useEffect } from "react";
import { Space, Select, Typography, Col, Row, Button } from "antd";
import { debounce } from "lodash";
import { ArrowBackIcon, ThunderstormIcon } from "../../assets/icons/Icons";
import { IOpenWeatherResponse } from "../../types/types";
import ReactAnimatedWeather from "react-animated-weather";
import { resetPageStyle } from "../../utils/resetPageLayout";
import { useTranslation } from "react-i18next";
import { useSelectedCity } from "../../contexts/SelectedCityContext";
import { getCities } from "../../services/OpenWeatherApi";

const { Option } = Select;

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { selectedCity, setSelectedCity } = useSelectedCity();
  const [cityOptions, setCityOptions] = useState<IOpenWeatherResponse[]>([]);
  const [visibleContent, setVisibleContent] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const currentLanguageIsPortuguese = i18n.language === "pt";
  const temperatureMetric = currentLanguageIsPortuguese ? "°C" : "°F";
  const selectedCityCountry = selectedCity?.sys?.country;

  useEffect(() => {
    const hasSelectedCity =
      selectedCity && Object.keys(selectedCity)?.length > 0;

    setTimeout(() => setVisibleContent("visible"), 100);

    if (hasSelectedCity) {
      document.documentElement.classList.add("daytime");
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setVisibleContent("visible"), 100);
  }, [selectedCity]);

  function RenderIcon({ id }: { id: number }) {
    if (id >= 200 && id <= 232) {
      return <ThunderstormIcon />;
    } else {
      return (
        <ReactAnimatedWeather
          icon={getWeatherIcon(id)}
          color={getWeatherIconColor(id)}
          size={128}
          animate={true}
        />
      );
    }
  }

  function getWeatherIcon(id: number) {
    if (id >= 200 && id <= 232) return "RAIN";
    if (id >= 300 && id <= 321) return "RAIN";
    if (id >= 500 && id <= 531) return "RAIN";
    if (id >= 600 && id <= 622) return "SNOW";
    if (id === 800) return "CLEAR_DAY";
    if (id === 801) return "PARTLY_CLOUDY_DAY";
    if (id >= 802 && id <= 804) return "CLOUDY";
    if (id >= 701 && id <= 781) return "FOG";
    return "CLOUDY";
  }

  function getWeatherIconColor(id: number) {
    if (id >= 200 && id <= 232) return "blue";
    if (id >= 300 && id <= 321) return "blue";
    if (id >= 500 && id <= 531) return "blue";
    if (id >= 600 && id <= 622) return "white";
    if (id === 800) return "goldenrod";
    if (id === 801) return "white";
    if (id >= 802 && id <= 804) return "white";
    if (id >= 701 && id <= 781) return "gray";
    return "white";
  }

  async function handleSearch(value: string) {
    if (!value || value.length < 2) return;

    setLoading(true);
    try {
      const { data } = await getCities(value, currentLanguageIsPortuguese);
      setCityOptions(data.list);
    } catch (error) {
      console.error(t("city_request_error"), error);
    } finally {
      setLoading(false);
    }
  }

  function onSelectCity(cityId: number) {
    setVisibleContent(undefined);
    const stars = document.getElementById("stars");
    const stars2 = document.getElementById("stars2");
    const stars3 = document.getElementById("stars3");

    if (stars) stars.style.opacity = "0";
    if (stars2) stars2.style.opacity = "0";
    if (stars3) stars3.style.opacity = "0";

    document.documentElement.classList.add("daytime");

    setTimeout(
      () =>
        setSelectedCity(
          cityOptions.find((city) => city.id === cityId) ||
            ({} as IOpenWeatherResponse)
        ),
      1500
    );
    setCityOptions([]);
  }

  function goBack() {
    setVisibleContent(undefined);
    resetPageStyle();

    setTimeout(() => setSelectedCity({} as IOpenWeatherResponse), 1500);
    setSelectedCity({} as IOpenWeatherResponse);
  }

  function clearOptionsOnSelectDropdownClose(open: boolean) {
    if (!open) {
      setCityOptions([]);
    }
  }

  return (
    <Space className={`home-page-container ${visibleContent}`}>
      {selectedCity && Object.keys(selectedCity)?.length > 0 ? (
        <div className={"home-page-informations-container"}>
          <Button className="go-back-button" onClick={goBack}>
            <ArrowBackIcon /> {t("back")}
          </Button>
          <div className="home-information-section">
            <RenderIcon id={selectedCity?.weather[0]?.id} />

            <Typography.Text>
              <strong>{t("weather")}</strong>{" "}
              {t(selectedCity?.weather[0]?.main)}
            </Typography.Text>

            <Typography.Text>
              <strong>{t("weather_description")}</strong>{" "}
              {t(`${selectedCity?.weather[0]?.id}`)}
            </Typography.Text>
          </div>
          <div className="home-information-section">
            <Row className="city-title-container">
              <img
                src={`https://flagcdn.com/w80/${
                  selectedCityCountry.toLowerCase() || "br"
                }.png`}
                alt={t("country_flag")}
              />
              <Typography.Title level={1}>
                {selectedCity?.name} - {selectedCityCountry}
              </Typography.Title>
            </Row>
            <Row className={"weather-informations-container"}>
              <Col sm={24} md={12}>
                <Typography.Text>
                  <strong>{t("temperature")}</strong> {selectedCity?.main?.temp}
                  {temperatureMetric}
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("feels_like")}</strong>{" "}
                  {selectedCity?.main?.feels_like}
                  {temperatureMetric}
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("minimum_temperature")}</strong>{" "}
                  {selectedCity?.main?.temp_min}
                  {temperatureMetric}
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("maximum_temperature")}</strong>{" "}
                  {selectedCity?.main?.temp_max}
                  {temperatureMetric}
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("atmospheric_pressure")}</strong>{" "}
                  {selectedCity?.main?.pressure} hPa
                </Typography.Text>
              </Col>
              <Col sm={24} md={12}>
                <Typography.Text>
                  <strong>{t("humidity")}</strong>{" "}
                  {selectedCity?.main?.humidity}%
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("wind_speed")}</strong> {selectedCity?.wind?.speed}{" "}
                  m/s
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("wind_direction")}</strong>{" "}
                  {selectedCity?.wind?.deg}°
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("cloud_coverage_percentage")}</strong>{" "}
                  {selectedCity?.clouds?.all}%
                </Typography.Text>
                <Typography.Text>
                  <strong>{t("updated_at")}</strong>{" "}
                  {new Date(selectedCity?.dt * 1000).toLocaleString(
                    i18n.language
                  )}
                </Typography.Text>
              </Col>
            </Row>
          </div>
        </div>
      ) : (
        <Select
          size={"large"}
          className={`city-select ${visibleContent}`}
          showSearch
          placeholder={t("search_a_city")}
          onSearch={debounce(handleSearch, 500)}
          onChange={onSelectCity}
          loading={loading}
          filterOption={false}
          optionFilterProp="children"
          notFoundContent={t("no_options")}
          onDropdownVisibleChange={clearOptionsOnSelectDropdownClose}
        >
          {cityOptions?.map((city) => (
            <Option key={city?.id} value={city?.id}>
              {city?.name}, {city?.sys?.country}
            </Option>
          ))}
        </Select>
      )}
    </Space>
  );
};

export default HomePage;
