import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Apply from "./pages/Apply/Apply";
import Home from "./pages/Home/Home";
import HeroFirst from "./components/HeroFirst/HeroFirst";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
