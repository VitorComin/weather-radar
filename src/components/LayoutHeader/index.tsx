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
      <Typography.Title className={"site-title"}>
        Weather Radar
      </Typography.Title>
      <div className={"header-links-container"}>
        <Link className={"header-link"} to="/">
          {t("home")}
        </Link>
        <Link className={"header-link"} onClick={resetPageStyle} to="/about">
          {t("about")}
        </Link>

        <a className={"header-link"} onClick={() => changePageLanguage("pt")}>
          <Flag country="BR" />
        </a>
        <a className={"header-link"} onClick={() => changePageLanguage("en")}>
          <Flag country="US" />
        </a>
      </div>
    </Header>
  );
};

export default LayoutHeader;
