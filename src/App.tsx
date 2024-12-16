import React from "react";
import { Layout, Typography } from "antd";
import { Link, Route, Routes, BrowserRouter as Router } from "react-router-dom";
import HomePage from "./pages/Home/ index";
import AboutPage from "./pages/About";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Header
        style={{
          height: "8vh",
          position: "relative",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "transparent",
        }}
      >
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
        style={{
          backgroundColor: "transparent",
          height: "92vh",
          width: "100vw",
        }}
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
