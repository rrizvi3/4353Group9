import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ClientProfile from "./pages/ClientProfile";
import FuelQuoteForm from "./pages/FuelQuoteForm";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import NotFound from "./pages/NotFound";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const quotes = axios.get("http://localhost:5000/fuel-quote-history");

const client = {
  fullName: "John Doe",
  address1: "123 Main St",
  address2: "Apt 4B",
  city: "Albany",
  state: "NY",
  zipcode: "10001",
};

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:clientid" element={<ClientProfile />} />
          <Route
            path="/client/newquote"
            element={<FuelQuoteForm client={client} />}
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
