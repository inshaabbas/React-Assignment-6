import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Show a simple spinner while Firebase checks auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-ink-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-ink-700 border-t-ink-300 rounded-full animate-spin" />
          <p className="text-ink-500 text-sm font-body">Loading…</p>
        </div>
      </div>
    );
  }

  // Not authenticated → redirect to login page
  if (!user) return <Navigate to="/login" replace />;

  // Authenticated → render the protected page
  return children;
}
