import { Col, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { ThunderstormIcon } from "../../assets/icons/Icons";
import ReactAnimatedWeather from "react-animated-weather";
import { ICityWeatherInformations } from "../../types/types";

const CityWeatherInformations: React.FC<ICityWeatherInformations> = ({
  selectedCity,
}) => {
  const { t, i18n } = useTranslation();
  const selectedCityCountry = selectedCity?.sys?.country;

  function RenderIcon({ weatherId }: { weatherId: number }) {
    if (weatherId >= 200 && weatherId <= 232) {
      return <ThunderstormIcon />;
    } else {
      return (
        <ReactAnimatedWeather
          icon={getWeatherIcon(weatherId)}
          color={getWeatherIconColor(weatherId)}
          size={128}
          animate={true}
        />
      );
    }
  }

  function getWeatherIcon(weatherId: number) {
    if (weatherId >= 200 && weatherId <= 232) return "RAIN";
    if (weatherId >= 300 && weatherId <= 321) return "RAIN";
    if (weatherId >= 500 && weatherId <= 531) return "RAIN";
    if (weatherId >= 600 && weatherId <= 622) return "SNOW";
    if (weatherId === 800) return "CLEAR_DAY";
    if (weatherId === 801) return "PARTLY_CLOUDY_DAY";
    if (weatherId >= 802 && weatherId <= 804) return "CLOUDY";
    if (weatherId >= 701 && weatherId <= 781) return "FOG";
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
  return (
    <>
      <div className="home-information-section">
        <RenderIcon weatherId={selectedCity?.weather[0]?.id} />
        <Typography.Text>
          <strong>{t("weather")}</strong> {t(selectedCity?.weather[0]?.main)}
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
              {"°C"}
            </Typography.Text>
            <Typography.Text>
              <strong>{t("feels_like")}</strong>{" "}
              {selectedCity?.main?.feels_like}
              {"°C"}
            </Typography.Text>
            <Typography.Text>
              <strong>{t("minimum_temperature")}</strong>{" "}
              {selectedCity?.main?.temp_min}
              {"°C"}
            </Typography.Text>
            <Typography.Text>
              <strong>{t("maximum_temperature")}</strong>{" "}
              {selectedCity?.main?.temp_max}
              {"°C"}
            </Typography.Text>
            <Typography.Text>
              <strong>{t("atmospheric_pressure")}</strong>{" "}
              {selectedCity?.main?.pressure} hPa
            </Typography.Text>
          </Col>

          <Col sm={24} md={12}>
            <Typography.Text>
              <strong>{t("humidity")}</strong> {selectedCity?.main?.humidity}%
            </Typography.Text>
            <Typography.Text>
              <strong>{t("wind_speed")}</strong> {selectedCity?.wind?.speed} m/s
            </Typography.Text>
            <Typography.Text>
              <strong>{t("wind_direction")}</strong> {selectedCity?.wind?.deg}°
            </Typography.Text>
            <Typography.Text>
              <strong>{t("cloud_coverage_percentage")}</strong>{" "}
              {selectedCity?.clouds?.all}%
            </Typography.Text>
            <Typography.Text>
              <strong>{t("updated_at")}</strong>{" "}
              {new Date(selectedCity?.dt * 1000).toLocaleString(i18n.language)}
            </Typography.Text>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CityWeatherInformations;
