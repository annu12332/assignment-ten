import React, { useState } from "react";
import { useAuth } from "../AuthProvider";
import axios from "axios";

const Signup = () => {
  const { registerWithEmailPassword, updateUserProfile } = useAuth();

  // ImgBB API Key (.env ফাইলে VITE_IMGBB_API_KEY নামে সেভ করবেন)
  const image_hosting_key = import.meta.env.VITE_IMGBB_API_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ১. ইমেজ ফাইল ধরা
      const imageFile = e.target.image.files[0];
      const formData = new FormData();
      formData.append("image", imageFile);

      // ২. Axios দিয়ে ImgBB তে ইমেজ আপলোড
      const res = await axios.post(image_hosting_api, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      if (res.data.success) {
        const photoURL = res.data.data.display_url;

        // ৩. Firebase এ একাউন্ট তৈরি
        const userCredential = await registerWithEmailPassword(email, password);

        // ৪. Profile আপডেট (নাম এবং ImgBB থেকে পাওয়া ফটোলিঙ্ক)
        await updateUserProfile(name, photoURL);

        console.log("User Created & Profile Updated with ImgBB link");
        alert("Account created successfully!");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="text-3xl mb-2 mt-3 font-bold text-center text-blue-700">
        Signup
      </h2>

      <form onSubmit={handleSignup} className="flex flex-col items-center text-xl">
        {/* Name */}
        <input
          className="border-2 text-center mt-2 mb-3 rounded-full"
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* Photo File Input */}
        <div className="flex flex-col items-center mb-3">
          <label className="text-sm text-gray-500 mb-1">Select Profile Photo</label>
          <input
            className="text-sm"
            type="file"
            name="image"
            accept="image/*"
            required
          />
        </div>

        {/* Email */}
        <input
          className="border-2 text-center mt-2 mb-3 rounded-full"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Password */}
        <input
          className="border-2 text-center mt-2 mb-3 rounded-full"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          className={`${
            loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-900"
          } text-white px-10 py-2 rounded-full mb-4`}
          type="submit"
          disabled={loading}
        >
          {loading ? "Uploading & Signing up..." : "Sign Up"}
        </button>
      </form>

      {error && <p className="text-red-600 text-center">{error}</p>}
    </div>
  );
};

export default Signup;