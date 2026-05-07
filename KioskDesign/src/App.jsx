import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
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
        <Route path="/Pago" element={<Checkout />} />
        <Route path="/Pago/Efectivo/:id" element={<PayCash />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Tipo_Orden" element={<OrderType />} />
        <Route path="*" element={<StartScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
