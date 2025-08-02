import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import CustomerDashboard from './pages/CustomerSide/CustomerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperSide/ShopkeeperDashboard';
import CustomerSignup from './pages/CustomerSide/Register';
import CustomerLogin from './pages/CustomerSide/Login';
import ShopkeeperRegister from './pages/ShopkeeperSide/ShopkeeperRegister';
import ShopkeeperLogin from './pages/ShopkeeperSide/ShopkeeperLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/customer/dashboard" element={<CustomerDashboard />} />
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/customer/login" element={<CustomerLogin />} />
        <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
        <Route path="/shopkeeper/register" element={<ShopkeeperRegister />} />
        <Route path="/shopkeeper/login" element={<ShopkeeperLogin />} />
      </Routes>
    </Router>
  );
}

export default App;