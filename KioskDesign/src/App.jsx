import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import { Navigate } from 'react-router-dom';
import Home from './pages/home.jsx';
import Checkout from './pages/checkout.jsx';
import PayCash from './pages/checkoutCash.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/PayCash" element={<PayCash />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
