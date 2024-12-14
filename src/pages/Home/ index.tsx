import React, { useState, useEffect } from "react";
import { Space, Select } from "antd";
// import { debounce } from "lodash";

const { Option } = Select;

const HomePage: React.FC = () => {
  const [cityOptions, setCityOptions] = useState<any[]>([]);
  const [selectedCity, setSelectedCity] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log(selectedCity);
  }, [selectedCity]);

  const handleSearch = async (value: string) => {
    if (!value || value.length < 3) return;

    setLoading(true);
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/find?q=${value}&appid=b6432528466c2ddd5717e9a9ae56b0f9`
      );
      const data = await response.json();

      setCityOptions(data.list);
    } catch (error) {
      console.error("Erro ao buscar as cidades:", error);
    } finally {
      setLoading(false);
    }
  };

  function onSelectCity(cityId: number) {
    setSelectedCity(cityOptions.find((city) => city.id === cityId));
  }

  return (
    <Space style={{ height: "100%", width: "100%", justifyContent: "center" }}>
      <Select
        size={"large"}
        style={{ width: 250, opacity: 0.7 }}
        dropdownStyle={{ opacity: 0.7 }}
        showSearch
        placeholder="Escolha uma cidade"
        onSearch={handleSearch}
        // onSearch={debounce(handleSearch, 500)}
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
    </Space>
  );
};

export default HomePage;
