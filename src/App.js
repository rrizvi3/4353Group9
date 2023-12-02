import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import ClientProfile from "./pages/ClientProfile";
import FuelQuoteForm from "./pages/FuelQuoteForm";
import FuelQuoteHistory from "./pages/FuelQuoteHistory";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:clientid" element={<ClientProfile />} />
          <Route path="/:clientid/newquote" element={<FuelQuoteForm />} />
          <Route
            path="/:clientid/quotehistory"
            element={<FuelQuoteHistory />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
