import React, { useState } from "react";
import { useAuth } from "../AuthProvider"; // যদি AuthProvider.jsx এক level উপরে থাকে

const Signup = () => {
  const { registerWithEmailPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault(); // page reload বন্ধ করার জন্য
    setError("");

    try {
      const userCredential = await registerWithEmailPassword(email, password);
      console.log("User created:", userCredential.user);
      alert("Account created successfully!");
      // এখানে চাইলে redirect করতে পারো
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Signup;
