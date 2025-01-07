import React, { useState, useEffect } from "react";
import { Space, Select, Typography, Col, Row, Button } from "antd";
import { debounce } from "lodash";
import axios from "axios";
import { ArrowBackIcon, ThunderstormIcon } from "../../assets/icons/Icons";
import { IOpenWeatherResponse } from "../../types/types";
import ReactAnimatedWeather from "react-animated-weather";

const { Option } = Select;

const HomePage: React.FC = () => {
  const [cityOptions, setCityOptions] = useState<IOpenWeatherResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<IOpenWeatherResponse>(
    {} as IOpenWeatherResponse
  );
  const [visibleContent, setVisibleContent] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const RenderIcon = ({ id }: { id: number }) => {
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
  };

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

  useEffect(() => {
    setTimeout(() => setVisibleContent("visible"), 0);
  }, []);

  useEffect(() => {
    setTimeout(() => setVisibleContent("visible"), 0);
  }, [selectedCity]);

  const handleSearch = async (value: string) => {
    if (!value || value.length < 3) return;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/find?q=${value}&units=metric&appid=b6432528466c2ddd5717e9a9ae56b0f9&lang=pt`
      );

      setCityOptions(data.list);
    } catch (error) {
      console.error("Erro ao buscar as cidades:", error);
    } finally {
      setLoading(false);
    }
  };

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
  }

  function goBack() {
    setVisibleContent(undefined);
    const stars = document.getElementById("stars");
    const stars2 = document.getElementById("stars2");
    const stars3 = document.getElementById("stars3");

    if (stars) stars.style.opacity = "1";
    if (stars2) stars2.style.opacity = "1";
    if (stars3) stars3.style.opacity = "1";

    document.documentElement.classList.remove("daytime");

    setTimeout(() => setSelectedCity({} as IOpenWeatherResponse), 1500);
    setSelectedCity({} as IOpenWeatherResponse);
  }

  return (
    <Space className={`home-page-container ${visibleContent}`}>
      {selectedCity && Object.keys(selectedCity)?.length > 0 ? (
        <div className={"home-page-informations-container"}>
          <Button
            onClick={goBack}
            style={{
              background: "transparent",
              width: "fit-content",
              color: "#FFF",
              position: "absolute",
              left: 25,
              top: "9vh",
              border: "none",
              fontSize: 18,
            }}
          >
            <ArrowBackIcon /> Voltar
          </Button>
          <div className="home-information-section">
            <RenderIcon id={selectedCity?.weather[0]?.id} />

            <Typography.Text>
              <strong>Clima:</strong> {selectedCity?.weather[0]?.main}
            </Typography.Text>

            <Typography.Text>
              <strong>Descrição do Clima:</strong>{" "}
              {selectedCity?.weather[0]?.description
                ? selectedCity.weather[0].description.charAt(0).toUpperCase() +
                  selectedCity.weather[0].description.slice(1)
                : ""}
            </Typography.Text>
          </div>
          <div className="home-information-section">
            <Row
              style={{
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <img
                src={`https://flagcdn.com/w80/${
                  selectedCity?.sys?.country.toLowerCase() || "br"
                }.png`}
                alt="Bandeira do País"
                style={{ marginRight: 20 }}
              />
              <Typography.Title
                style={{ justifyContent: "center", display: "flex" }}
                level={1}
              >
                {selectedCity?.name} - {selectedCity?.sys?.country}
              </Typography.Title>
            </Row>
            <Row style={{ marginTop: 50 }}>
              <Col sm={24} md={12}>
                <Typography.Text>
                  <strong>Temperatura:</strong> {selectedCity?.main?.temp}°C
                </Typography.Text>
                <Typography.Text>
                  <strong>Sensação Térmica:</strong>{" "}
                  {selectedCity?.main?.feels_like}°C
                </Typography.Text>
                <Typography.Text>
                  <strong>Temperatura Mínima:</strong>{" "}
                  {selectedCity?.main?.temp_min}°C
                </Typography.Text>
                <Typography.Text>
                  <strong>Temperatura Máxima:</strong>{" "}
                  {selectedCity?.main?.temp_max}°C
                </Typography.Text>
                <Typography.Text>
                  <strong>Pressão Atmosférica:</strong>{" "}
                  {selectedCity?.main?.pressure} hPa
                </Typography.Text>
              </Col>
              <Col span={12}>
                <Typography.Text>
                  <strong>Umidade:</strong> {selectedCity?.main?.humidity}%
                </Typography.Text>
                <Typography.Text>
                  <strong>Velocidade do Vento:</strong>{" "}
                  {selectedCity?.wind?.speed} m/s
                </Typography.Text>
                <Typography.Text>
                  <strong>Direção do Vento:</strong> {selectedCity?.wind?.deg}°
                </Typography.Text>
                <Typography.Text>
                  <strong>Porcentagem coberta por nuvens:</strong>{" "}
                  {selectedCity?.clouds?.all}%
                </Typography.Text>
                <Typography.Text>
                  <strong>Atualizado em:</strong>{" "}
                  {new Date(selectedCity?.dt * 1000).toLocaleString("pt-BR")}
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
          placeholder="Escolha uma cidade"
          onSearch={debounce(handleSearch, 500)}
          onChange={onSelectCity}
          loading={loading}
          filterOption={false}
          optionFilterProp="children"
        >
          {cityOptions?.map((city) => (
            <Option key={city.id} value={city.id}>
              {city.name}, {city.sys.country}
            </Option>
          ))}
        </Select>
      )}
    </Space>
  );
};

export default HomePage;
