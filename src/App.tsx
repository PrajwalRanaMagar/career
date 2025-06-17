import { Routes, Route, BrowserRouter } from "react-router-dom";
import Apply from "./components/Apply";
import Application from "./components/Application";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Application />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
