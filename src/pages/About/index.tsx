import { Space, Typography } from "antd";
import { useState, useEffect } from "react";

const AboutPage: React.FC = () => {
  const [visibleAboutContent, setVisibleAboutContent] = useState<
    string | undefined
  >();

  useEffect(() => {
    console.log(visibleAboutContent);
    setTimeout(() => setVisibleAboutContent("visible"), 100);
  }, []);

  return (
    <Space className={`about-page-container ${visibleAboutContent}`}>
      <Typography.Paragraph style={{ margin: "20px" }}>
        Página About em construção...
      </Typography.Paragraph>
    </Space>
  );
};

export default AboutPage;
