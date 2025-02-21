import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Questionnaire from "./pages/Questionnaire";
import SubmitSuccess from "./components/SubmitSuccess";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/submit-success" element={<SubmitSuccess />} />
      </Routes>
    </Router>
  );
};

export default App;
