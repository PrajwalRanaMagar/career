import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Apply from "./pages/Apply/Apply";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
// import HeroFirst from "./components/HeroFirst/HeroFirstt";
import ScrollToTop from "./components/Scrolltotop/ScrollToTop";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
