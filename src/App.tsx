import React from "react";
import { Layout, Typography } from "antd";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/Home/ index";
import AboutPage from "./pages/About";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Header
        style={{
          height: "8vh",
          boxShadow: "0px 2px 5px rgba(244, 244, 244, 0.3)",
          position: "relative",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography.Title style={{ margin: 0 }}>
          Stock Comparator
        </Typography.Title>
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
      <Content
        style={{ backgroundColor: "#001529", height: "92vh", width: "100vw" }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Content>
    </Router>
  );
}

export default App;
