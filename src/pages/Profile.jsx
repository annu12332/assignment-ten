import React, { useState } from "react";
import { useAuth } from "../AuthProvider";

const Profile = () => {
  const { user, updateUserProfile } = useAuth(); // Ensure function name matches your AuthProvider
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Assuming updateUserProfile is the function that handles firebase/auth update
      await updateUserProfile(name, photo);
      // Success State: Replace alert with a toast if you have one
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-base-content">Profile Settings</h2>
        <p className="text-gray-500">Manage your account information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-base-100 border border-base-200 rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative group">
              <img 
                src={user.photoURL || "https://i.ibb.co/mJR9fX4/user-placeholder.png"} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-lg transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-white text-xs font-bold italic">Preview</span>
              </div>
            </div>
            <h3 className="mt-4 text-xl font-bold text-base-content">{user.displayName || "User Name"}</h3>
            <p className="text-sm text-gray-400 mb-4">{user.email}</p>
            <div className="badge badge-primary badge-outline px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">
              Pet Lover / Member
            </div>
          </div>
        </div>

        {/* Right Side: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-base-100 border border-base-200 rounded-3xl p-6 lg:p-8 shadow-sm">
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Input */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">Full Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary transition-all bg-base-50"
                    required
                  />
                </div>

                {/* Email (Read Only - Requirement 7) */}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold text-base-content">Email Address</span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full rounded-xl bg-base-200 cursor-not-allowed text-gray-500"
                  />
                </div>
              </div>

              {/* Photo URL Input */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-base-content">Photo URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://example.com/photo.jpg"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-primary transition-all bg-base-50"
                />
              </div>

              <div className="pt-4 border-t border-base-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className={`btn btn-primary px-10 rounded-xl text-white shadow-md hover:shadow-lg transition-all ${loading ? 'loading' : ''}`}
                >
                  {loading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;