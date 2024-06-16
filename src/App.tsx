import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import OrderBookPage from "./Pages/OrderBookPage";



function App() {
  return (

    <Routes>
      <Route path="/" element={<OrderBookPage />} />
      <Route path="/orderbook" element={<OrderBookPage />} />
      <Route path="*" element={<Navigate to="/orderbook" replace />} />    </Routes>
  );
}

export default App;
