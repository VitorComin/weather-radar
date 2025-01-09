import { Space, Typography } from "antd";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const [visibleAboutContent, setVisibleAboutContent] = useState<
    string | undefined
  >();

  useEffect(() => {
    setTimeout(() => setVisibleAboutContent("visible"), 100);
  }, []);

  return (
    <Space className={`about-page-container ${visibleAboutContent}`}>
      <Typography.Paragraph className={"about-the-project-paragraph"}>
        {t("simple_project_description")}
        <br />
        <br />
        {t("project_weather_api")}
        <br />
        <br />
        {t("css_skills_description")}
        <br />
        <br />
        {t("react_code_organization")}
        <br />
        <br />
        {t("jest_tests_info")}
        <br />
        <br />
        {t("project_stack")}
        <br />
        <br />
        <Typography.Link href="https://www.youtube.com/watch?v=aywzn9cf-_U">
          {t("stars_template")}
        </Typography.Link>
        <br />
        <br />
        <Typography.Link href="https://openweathermap.org/api">
          OpenWeatherAPI
        </Typography.Link>
      </Typography.Paragraph>
    </Space>
  );
};

export default AboutPage;
