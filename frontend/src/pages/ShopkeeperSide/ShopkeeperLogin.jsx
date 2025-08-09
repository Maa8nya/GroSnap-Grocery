import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ShopkeeperLogin() {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login
    localStorage.setItem("shopkeeperLoggedIn", "true");
    localStorage.setItem("shopkeeperPhone", formData.phone);
    navigate("/shopkeeper/manage"); // ✅ Redirect after login
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) =>
          setFormData({ ...formData, phone: e.target.value })
        }
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />
      <button type="submit">Login</button>
    </form>
  );
}
