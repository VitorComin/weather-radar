import { Layout, Typography } from "antd";
import { Link } from "react-router-dom";
import { resetPageStyle } from "../../utils/resetPageLayout";

const { Header } = Layout;

const LayoutHeader: React.FC = () => {
  return (
    <Header className="layout-header-container">
      <Typography.Title style={{ margin: 0 }}>Weather Radar</Typography.Title>
      <div>
        <Link
          to="/"
          style={{
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          Home
        </Link>
        <Link
          onClick={resetPageStyle}
          to="/about"
          style={{
            margin: "0 10px",
            textDecoration: "none",
          }}
        >
          About
        </Link>
      </div>
    </Header>
  );
};

export default LayoutHeader;
