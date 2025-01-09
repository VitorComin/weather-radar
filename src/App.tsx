import { HashRouter as Router } from "react-router-dom";
import LayoutHeader from "./components/LayoutHeader";
import LayoutContent from "./components/LayoutContent";
import BackgroundStars from "./components/BackgroundStars";
import "./i18n";

function App() {
  return (
    <Router>
      <BackgroundStars />
      <LayoutHeader />
      <LayoutContent />
    </Router>
  );
}

export default App;
