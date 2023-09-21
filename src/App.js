import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ClientProfile from "./pages/ClientProfile";
import FuelQuoteForm from "./pages/FuelQuoteForm";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import NotFound from "./pages/NotFound";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

let client = {
  address1: "!",
  address2: "!2",
  city: "memphrica",
  state: "texas",
  zipcode: "77477",
};

let quotes = {};

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/client" element={<ClientProfile />} />
          <Route
            path="/client/newquote"
            element={<FuelQuoteForm clientProfile={client} />}
          />
          <Route
            path="/client/quotehistory"
            element={<FuelQuoteHistory quotes={quotes} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
