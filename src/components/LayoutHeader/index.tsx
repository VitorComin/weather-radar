import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import Flag from "react-flagkit";
import { resetPageStyle } from "../../utils/resetPageLayout";
import { useTranslation } from "react-i18next";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  const { t, i18n } = useTranslation();

  function changePageLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <Header className="layout-header-container">
      <Typography.Title>Weather Radar</Typography.Title>
      <div className={"header-links-container"}>
        <Link to="/">{t("home")}</Link>
        <Link onClick={resetPageStyle} to="/about">
          {t("about")}
        </Link>

        <a onClick={() => changePageLanguage("pt")}>
          <Flag country="BR" />
        </a>
        <a onClick={() => changePageLanguage("en")}>
          <Flag country="US" />
        </a>
      </div>
    </Header>
  );
};

export default LayoutHeader;
