

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp, signInWithGoogle } from "../firebase/auth";

export default function Login() {
  const navigate = useNavigate();

  // Toggle between "login" and "signup" modes
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name:     "",
    email:    "",
    password: "",
  });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Email + password submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (mode === "signup" && !form.name.trim())
      return setError("Please enter your name.");
    if (!form.email.trim())
      return setError("Please enter your email.");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters.");

    setLoading(true);
    try {
      if (mode === "signup") {
        await signUp(form.email, form.password, form.name.trim());
      } else {
        await signIn(form.email, form.password);
      }
      navigate("/"); // Go to dashboard on success
    } catch (err) {
      // Map Firebase error codes to friendly messages
      const code = err.code || "";
      if (code === "auth/email-already-in-use")  setError("That email is already in use.");
      else if (code === "auth/user-not-found")   setError("No account found with that email.");
      else if (code === "auth/wrong-password")   setError("Incorrect password.");
      else if (code === "auth/invalid-email")    setError("Invalid email address.");
      else if (code === "auth/invalid-credential") setError("Incorrect email or password.");
      else setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Google sign-in
  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isSignup = mode === "signup";

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4">
      {/* Background subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        {/* Logo */}
        <div className="text-center mb-10 animate-fade-up">
          <div className="w-12 h-12 bg-ink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M3 5.5h16M3 11h10M3 16.5h7" stroke="#0e0c0b" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h1 className="font-display font-800 text-3xl text-ink-50 tracking-tight">
            Ledger
          </h1>
          <p className="text-ink-500 text-sm mt-2 font-body">
            {isSignup ? "Create your account" : "Sign in to your account"}
          </p>
        </div>

        {/* Card */}
        <div className="card p-6 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name field (signup only) */}
            {isSignup && (
              <div>
                <label className="section-label block mb-2">Full Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Jane Smith"
                  className="input-base"
                  autoFocus
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="section-label block mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-base"
                autoFocus={!isSignup}
              />
            </div>

            {/* Password */}
            <div>
              <label className="section-label block mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder={isSignup ? "Min. 6 characters" : "••••••••"}
                className="input-base"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-ember-400 text-sm font-body bg-ember-500/10 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50 mt-2"
            >
              {loading
                ? "Please wait…"
                : isSignup
                ? "Create Account"
                : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-ink-800" />
            <span className="text-xs text-ink-600 font-body">or</span>
            <div className="flex-1 h-px bg-ink-800" />
          </div>

          {/* Google sign-in */}
          <button
            onClick={handleGoogle}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-ink-800 hover:bg-ink-700
                       border border-ink-700 text-ink-200 text-sm font-body
                       px-5 py-2.5 rounded-xl transition-all duration-200 active:scale-95 disabled:opacity-50"
          >
            {/* Google "G" icon */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M15.68 8.18c0-.57-.05-1.12-.14-1.64H8v3.1h4.3a3.68 3.68 0 01-1.6 2.42v2h2.6c1.52-1.4 2.38-3.46 2.38-5.88z" fill="#4285F4"/>
              <path d="M8 16c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-2.7.75 4.8 4.8 0 01-4.52-3.32H.8v2.06A8 8 0 008 16z" fill="#34A853"/>
              <path d="M3.48 9.49a4.8 4.8 0 010-3.04V4.4H.8a8 8 0 000 7.16l2.68-2.07z" fill="#FBBC05"/>
              <path d="M8 3.18a4.33 4.33 0 013.06 1.2l2.3-2.3A7.7 7.7 0 008 0 8 8 0 00.8 4.38l2.68 2.07A4.8 4.8 0 018 3.18z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          {/* Toggle mode */}
          <p className="text-center text-sm text-ink-500 mt-5 font-body">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              type="button"
              onClick={() => { setMode(isSignup ? "login" : "signup"); setError(""); }}
              className="text-ink-200 hover:text-ink-50 underline underline-offset-2 transition-colors"
            >
              {isSignup ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
