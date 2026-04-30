import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import { Navigate } from 'react-router-dom';
import StartScreen from './pages/startScreen.jsx';
import OrderType from './pages/orderType.jsx';
import Home from './pages/home.jsx';
import Checkout from './pages/checkout.jsx';
import PayCash from './pages/checkoutCash.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/PayCash" element={<PayCash />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/OrderType" element={<OrderType />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
