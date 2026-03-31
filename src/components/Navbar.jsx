import React from "react";
import { useState } from "react";
import { logOut } from "../firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ activeTab, setActiveTab }) {
  const { user } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  // Get just the first name for a friendly greeting
  const firstName = user?.displayName?.split(" ")[0] || "User";

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logOut();
    } catch (err) {
      console.error("Logout failed:", err);
      setLoggingOut(false);
    }
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard" },
    { id: "expenses",  label: "Expenses"  },
    { id: "income",    label: "Income"    },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo / app name */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-ink-100 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 4h12M2 8h8M2 12h5" stroke="#0e0c0b" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-display font-700 text-lg text-ink-50 tracking-tight">
              Ledger
            </span>
          </div>

          {/* Tab navigation (desktop) */}
          <nav className="hidden sm:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-body font-500 transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-ink-800 text-ink-50"
                    : "text-ink-400 hover:text-ink-200 hover:bg-ink-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* User info + logout */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-ink-400 font-body">
              Hi, <span className="text-ink-200">{firstName}</span>
            </span>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="btn-ghost text-xs px-3 py-2 disabled:opacity-50"
            >
              {loggingOut ? "…" : "Sign out"}
            </button>
          </div>
        </div>

        {/* Tab navigation (mobile) */}
        <nav className="sm:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-sm font-body font-500 transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-ink-800 text-ink-50"
                  : "text-ink-400 hover:text-ink-200"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
