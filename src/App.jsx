import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/Landing';
import CustomerDashboard from './pages/CustomerSide/CustomerDashboard';
import ShopkeeperDashboard from './pages/ShopkeeperSide/ShopkeeperDashboard';
import CustomerSignup from './pages/CustomerSide/Register';
import CustomerLogin from './pages/CustomerSide/Login';
import ShopkeeperRegister from './pages/ShopkeeperSide/ShopkeeperRegister';
import ShopkeeperLogin from './pages/ShopkeeperSide/ShopkeeperLogin';
import IntroGroSnap from './pages/IntroGroSnap';

function AppContent() {
  const [showIntro, setShowIntro] = useState(true);
  const location = useLocation();

  // Skip intro for routes other than root
  if (location.pathname !== '/' && showIntro) {
    setShowIntro(false);
    return null;
  }

  if (showIntro) {
    return <IntroGroSnap onFinish={() => setShowIntro(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/signup" element={<CustomerSignup />} />
      <Route path="/customer/login" element={<CustomerLogin />} />
      <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
      <Route path="/shopkeeper/register" element={<ShopkeeperRegister />} />
      <Route path="/shopkeeper/login" element={<ShopkeeperLogin />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;