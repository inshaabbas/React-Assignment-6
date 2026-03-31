
import React from "react";
import { useState } from "react";
import Navbar    from "../components/Navbar";
import Dashboard from "./Dashboard";
import Expenses  from "./Expenses";
import Income    from "./Income";

export default function DashboardLayout() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "dashboard" && (
          <Dashboard setActiveTab={setActiveTab} />
        )}
        {activeTab === "expenses" && <Expenses />}
        {activeTab === "income"   && <Income   />}
      </main>
    </div>
  );
}
