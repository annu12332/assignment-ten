import React from "react";
import { RiHeartFill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router";
import { useAuth } from "../AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navLinks = (
    <>
      <li><NavLink to="/home" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : ""}>Home</NavLink></li>
      <li><NavLink to="/services" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : ""}>Pets & Supplies</NavLink></li>
      <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : ""}>About Us</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>

        </>
      )}
    </>
  );

  return (
    // Sticky and Glassmorphism effect
    <div className="sticky top-0 z-50 backdrop-blur-sm bg-base-100/80 border-b border-base-200">
      <div className="navbar max-w-7xl mx-auto px-4 lg:px-8">

        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-medium">
              {navLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-primary/20">
              <RiHeartFill className="text-white text-2xl" />
            </div>
            <span className="font-black text-2xl tracking-tight hidden sm:block text-slate-800">
              Paw<span className="text-primary">Mart</span>
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-4 font-semibold">
            {navLinks}
          </ul>
        </div>

        <div className="navbar-end gap-3">
          {/* Dark/Light Mode Toggle Placeholder */}
          <label className="swap swap-rotate mr-2">
            <input type="checkbox" className="theme-controller" value="dark" />
            {/* Sun icon */}
            <svg className="swap-off fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,17.66l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
            {/* Moon icon */}
            <svg className="swap-on fill-current w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z" /></svg>
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary">
                <div className="w-10 rounded-full">
                  <img src={user?.photoURL || "https://i.ibb.co/mJR9fX4/user-placeholder.png"} alt="User" />
                </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li className="px-4 py-2 font-bold text-primary">{user?.displayName || "User"}</li>
                <div className="divider my-0"></div>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/profile">Profile Settings</Link></li>
                <li><button onClick={logout} className="text-error font-bold">Logout</button></li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm md:btn-md rounded-lg text-white">
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;