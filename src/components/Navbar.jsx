import React from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

 
  const handleProfileClick = () => {
    if (user) {
      navigate("/profile"); 
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <button onClick={handleProfileClick}>My Profile</button>
              </li>
              <li>
                <Link to="/addservices">Add-Services</Link>
              </li>
            </ul>
          </div>

          <a className="font-bold text-blue-700 text-2xl">
            Pa<span className="text-red-600">wP</span>aw
          </a>
        </div>

        
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 font-bold">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/addservices">Add-Services</Link>
            </li>
            <li>
              <Link to="/myads">My Ads</Link>
            </li>
            <li>
              <button
                onClick={handleProfileClick}
                className="flex items-center gap-2"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-6 h-6 rounded-full"
                  />
                ) : (
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                )}
                My Profile
              </button>
            </li>
          </ul>
        </div>

       
        <div className="navbar-end">
          {user ? (
            <button onClick={logout} className="btn btn-error text-white">
              Log Out
            </button>
          ) : (
            <Link to="/login" className="btn btn-primary text-white">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
