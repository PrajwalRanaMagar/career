import { Routes, Route, BrowserRouter } from "react-router-dom";
import Apply from './pages/Apply';
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
