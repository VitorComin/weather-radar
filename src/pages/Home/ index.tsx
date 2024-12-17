import React, { useState, useEffect } from "react";
import { Space, Select, Typography, Col, Row } from "antd";
import { debounce } from "lodash";
import axios from "axios";
import {
  CloudIcon,
  MistIcon,
  RainIcon,
  SnowIcon,
  SunIcon,
  ThunderstormIcon,
} from "../../assets/icons/Icons";
import { IOpenWeatherResponse } from "../../types/types";

const { Option } = Select;

const HomePage: React.FC = () => {
  const [cityOptions, setCityOptions] = useState<IOpenWeatherResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<IOpenWeatherResponse>(
    {} as IOpenWeatherResponse
  );
  const [visibleContent, setVisibleContent] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const RenderIcon = ({ id }: { id: number }) => {
    if (id >= 200 && id <= 232) return <ThunderstormIcon />;
    if (id >= 300 && id <= 321) return <RainIcon />;
    if (id >= 500 && id <= 531) return <RainIcon />;
    if (id >= 600 && id <= 622) return <SnowIcon />;
    if (id === 800) return <SunIcon />;
    if (id >= 801 && id <= 804) return <CloudIcon />;
    if (id >= 701 && id <= 781) return <MistIcon />;
    return <CloudIcon />;
  };

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
        `http://api.openweathermap.org/data/2.5/find?q=${value}&units=metric&appid=b6432528466c2ddd5717e9a9ae56b0f9`
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
    setTimeout(
      () =>
        setSelectedCity(
          cityOptions.find((city) => city.id === cityId) ||
            ({} as IOpenWeatherResponse)
        ),
      1500
    );
  }
  return (
    <Space className={`home-page-container ${visibleContent}`}>
      {selectedCity && Object.keys(selectedCity)?.length > 0 ? (
        <>
          <div
            style={{
              width: "50%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              marginTop: "-8vh",
            }}
          >
            <RenderIcon id={selectedCity?.weather[0]?.id} />

            <Typography.Title level={4}>
              Clima: {selectedCity?.weather[0]?.main}
            </Typography.Title>

            <Typography.Title level={4}>
              Descrição do Clima: {selectedCity?.weather[0]?.description}
            </Typography.Title>
          </div>
          <div
            style={{
              width: "50%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginTop: "-8vh",
            }}
          >
            <Row
              style={{
                alignItems: "center",
                marginTop: 50,
              }}
            >
              <Typography.Title
                style={{ justifyContent: "center", display: "flex" }}
                level={1}
              >
                <img
                  src={`https://flagcdn.com/w80/${
                    selectedCity?.sys?.country.toLowerCase() || "br"
                  }.png`}
                  alt="Bandeira do Brasil"
                  style={{ marginRight: 20 }}
                />
                {selectedCity?.name} - {selectedCity?.sys?.country}
              </Typography.Title>
            </Row>
            <Row style={{ marginTop: 50 }}>
              <Col span={12}>
                <Typography.Title level={5}>
                  Temperatura: {selectedCity?.main?.temp}
                </Typography.Title>
                <Typography.Title level={5}>
                  Sensação Térmica: {selectedCity?.main?.feels_like}
                </Typography.Title>
                <Typography.Title level={5}>
                  Temperatura Mínima: {selectedCity?.main?.temp_min}
                </Typography.Title>
                <Typography.Title level={5}>
                  Temperatura Máxima: {selectedCity?.main?.temp_max}
                </Typography.Title>
                <Typography.Title level={5}>
                  Pressão Atmosférica: {selectedCity?.main?.pressure}
                </Typography.Title>
              </Col>
              <Col span={12}>
                <Typography.Title level={5}>
                  Umidade: {selectedCity?.main?.humidity}
                </Typography.Title>
                <Typography.Title level={5}>
                  Velocidade do Vento: {selectedCity?.wind?.speed}
                </Typography.Title>
                <Typography.Title level={5}>
                  Direção do Vento: {selectedCity?.wind?.deg}
                </Typography.Title>
                <Typography.Title level={5}>
                  Porcentagem coberta por nuvens: {selectedCity?.clouds?.all}
                </Typography.Title>
                <Typography.Title level={5}>
                  Atualizado em: {selectedCity?.dt}
                </Typography.Title>
              </Col>
            </Row>
          </div>
        </>
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
