import { Select } from "antd";
import { useTranslation } from "react-i18next";
import { ICitySelect, IOpenWeatherResponse } from "../../types/types";
import { useState } from "react";
import { getCities } from "../../services/OpenWeatherApi";
import { debounce } from "lodash";
import { setBrighterPageLayout } from "../../utils/setBrighterPageLayout";

const { Option } = Select;

const CitySelect: React.FC<ICitySelect> = ({
  currentLanguageIsPortuguese,
  setVisibleContent,
  setSelectedCity,
  ...props
}) => {
  const { t } = useTranslation();
  const [cityOptions, setCityOptions] = useState<IOpenWeatherResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSearch(value: string) {
    if (!value || value.length < 2) return;

    setLoading(true);
    try {
      const { data } = await getCities(
        value?.toLowerCase(),
        currentLanguageIsPortuguese
      );
      setCityOptions(data?.list);
    } catch (error) {
      console.error(t("city_request_error"), error);
    } finally {
      setLoading(false);
    }
  }

  function onSelectCity(cityId: number) {
    setVisibleContent(undefined);
    setBrighterPageLayout();
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

  function clearOptionsOnSelectDropdownClose(open: boolean) {
    if (!open) {
      setCityOptions([]);
    }
  }

  return (
    <Select
      size={"large"}
      showSearch
      placeholder={t("search_a_city")}
      filterOption={false}
      optionFilterProp="children"
      notFoundContent={t("no_options")}
      onSearch={debounce(handleSearch, 500)}
      onChange={onSelectCity}
      loading={loading}
      onDropdownVisibleChange={clearOptionsOnSelectDropdownClose}
      {...props}
    >
      {cityOptions?.map((city) => (
        <Option key={city?.id} value={city?.id}>
          {city?.name}, {city?.sys?.country}
        </Option>
      ))}
    </Select>
  );
};

export default CitySelect;
