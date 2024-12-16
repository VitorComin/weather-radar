import React, { useState, useEffect } from "react";
import { Space, Select, Typography } from "antd";
import { debounce } from "lodash";
import axios from "axios";

const { Option } = Select;

const HomePage: React.FC = () => {
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>(undefined);
  const [visibleSelect, setVisibleSelect] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => setVisibleSelect("visible"), 0);
  }, []);

  const handleSearch = async (value: string) => {
    if (!value || value.length < 3) return;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/find?q=${value}&appid=b6432528466c2ddd5717e9a9ae56b0f9`
      );

      setCityOptions(data.list);
    } catch (error) {
      console.error("Erro ao buscar as cidades:", error);
    } finally {
      setLoading(false);
    }
  };

  function onSelectCity(cityId: number) {
    setTimeout(
      () => setSelectedCity(cityOptions.find((city) => city.id === cityId)),
      1500
    );
    setVisibleSelect(undefined);
  }

  return (
    <Space style={{ height: "100%", width: "100%", justifyContent: "center" }}>
      {selectedCity ? (
        <Typography.Text>Em construção</Typography.Text>
      ) : (
        <Select
          size={"large"}
          className={`city-select ${visibleSelect}`}
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
