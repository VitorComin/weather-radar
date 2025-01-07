import { Layout } from "antd";
import HomePage from "../../pages/Home/ index";
import AboutPage from "../../pages/About";
import { Route, Routes } from "react-router-dom";

const { Content } = Layout;

const LayoutContent: React.FC = () => {
  return (
    <Content className="layout-content-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Content>
  );
};

export default LayoutContent;
