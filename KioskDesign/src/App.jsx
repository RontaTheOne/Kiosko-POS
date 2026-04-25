import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';  
import Home from './pages/home.jsx';
import Checkout from './pages/checkout.jsx';
import { Navigate } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
