import React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

// Create the context (starts as null — no user yet)
const AuthContext = createContext(null);

// AuthProvider wraps the whole app in App.jsx
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);  // Firebase user object or null
  const [loading, setLoading] = useState(true);  // true while Firebase initializes

  useEffect(() => {
    // onAuthStateChanged fires immediately with current user on mount,
    // then again whenever the user logs in or out.
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    // Cleanup the listener when the component unmounts
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — lets any component access the auth context cleanly
export const useAuth = () => useContext(AuthContext);
