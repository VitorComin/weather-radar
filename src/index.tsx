import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SelectedCityProvider } from "./contexts/SelectedCityContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SelectedCityProvider>
      <App />
    </SelectedCityProvider>
  </React.StrictMode>
);
