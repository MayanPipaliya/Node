import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Order from "./components/Order";
import CardPayment from "./components/CardPayment";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Order />} />
        <Route path="/card-payment" element={<CardPayment />} />
      </Routes>
    </Router>
  );
};

export default App;
