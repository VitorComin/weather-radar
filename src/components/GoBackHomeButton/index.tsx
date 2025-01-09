import { Button } from "antd";
import { ArrowBackIcon } from "../../assets/icons/Icons";
import { useTranslation } from "react-i18next";
import { resetPageStyle } from "../../utils/resetPageLayout";
import { IGoBackHomeButton, IOpenWeatherResponse } from "../../types/types";

const GoBackHomeButton: React.FC<IGoBackHomeButton> = ({
  setVisibleContent,
  setSelectedCity,
}) => {
  const { t } = useTranslation();

  function goBack() {
    setVisibleContent(undefined);
    resetPageStyle();
    setTimeout(() => setSelectedCity({} as IOpenWeatherResponse), 1500);
  }

  return (
    <Button className="go-back-button" onClick={goBack}>
      <ArrowBackIcon /> {t("back")}
    </Button>
  );
};

export default GoBackHomeButton;
