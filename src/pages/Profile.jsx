import React, { useState } from "react";
import { useAuth } from "../AuthProvider";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async () => {
    try {
      await updateProfile({ displayName: name, photoURL: photo });
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  if (!user) return <p>Please log in first.</p>;

  return (
    <div className="p-6 max-w-md mx-auto bg-gray-100 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full mb-4"/>
      <p><strong>Name:</strong> {user.displayName}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <input
          type="text"
          placeholder="Photo URL"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
