import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router"; // react-router-dom ব্যবহার
import { signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Please enter your email first!");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="p-6 border rounded shadow w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input input-bordered w-full mb-2"
        />

        <button onClick={handleLogin} className="btn btn-primary w-full mb-2">
          Login
        </button>

        <button onClick={handleGoogleLogin} className="btn btn-outline w-full mb-2">
          Login with Google
        </button>

        <button
          onClick={handleForgotPassword}
          className="text-blue-500 underline w-full text-center mb-2"
        >
          Forgot Password?
        </button>

        <div className="text-center mt-2">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
