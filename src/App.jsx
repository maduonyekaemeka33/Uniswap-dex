import React, { useState } from "react";
import SwapPage from "./components/SwapPage";
import AdminSendFrom from "./components/AdminSendFrom";

export default function App() {
  const [activeTab, setActiveTab] = useState("swap");

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>DeX Uniswap</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setActiveTab("swap")}>Swap / Subscribe</button>
        <button onClick={() => setActiveTab("admin")}>Admin Panel</button>
      </div>
      <div style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
        {activeTab === "swap" && <SwapPage />}
        {activeTab === "admin" && <AdminSendFrom />}
      </div>
    </div>
  );
}
