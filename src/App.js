import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ClientProfile from "./pages/ClientProfile";
import FuelQuoteForm from "./pages/FuelQuoteForm";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import NotFound from "./pages/NotFound";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client:id" element={<ClientProfile />} />
          <Route path="/client:id/newquote" element={<FuelQuoteForm />} />
          <Route path="/client:id/history" element={<FuelQuoteHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
