import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import LandingPage from "./pages/Landing";
import CustomerDashboard from "./pages/CustomerSide/CustomerDashboard";
import ShopkeeperDashboard from "./pages/ShopkeeperSide/ShopkeeperDashboard";
import CustomerSignup from "./pages/CustomerSide/Register";
import CustomerLogin from "./pages/CustomerSide/Login";
import ShopkeeperRegister from "./pages/ShopkeeperSide/ShopkeeperRegister";
import ShopkeeperLogin from "./pages/ShopkeeperSide/ShopkeeperLogin";
import ShopkeeperManagement from "./pages/ShopkeeperSide/ShopkeeperManagement"; // ✅ Added
import IntroGroSnap from "./pages/IntroGroSnap";

function AppContent() {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(() => {
    return localStorage.getItem("introShown") !== "true";
  });

  useEffect(() => {
    if (location.pathname !== "/" && showIntro) {
      setShowIntro(false);
      localStorage.setItem("introShown", "true");
    }
  }, [location, showIntro]);

  if (showIntro) {
    return (
      <IntroGroSnap
        onFinish={() => {
          setShowIntro(false);
          localStorage.setItem("introShown", "true");
        }}
      />
    );
  }

  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Customer */}
      <Route path="/customer/dashboard" element={<CustomerDashboard />} />
      <Route path="/customer/signup" element={<CustomerSignup />} />
      <Route path="/customer/login" element={<CustomerLogin />} />

      {/* Shopkeeper */}
      <Route path="/shopkeeper" element={<ShopkeeperDashboard />} />
      <Route path="/shopkeeper/register" element={<ShopkeeperRegister />} />
      <Route path="/shopkeeper/login" element={<ShopkeeperLogin />} />
      <Route path="/shopkeeper/manage" element={<ShopkeeperManagement />} /> {/* ✅ Added */}
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
