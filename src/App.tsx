import { Routes, Route, BrowserRouter } from "react-router-dom";
import Apply from "./pages/apply";
import Job from "./pages/jobs";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Job />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
