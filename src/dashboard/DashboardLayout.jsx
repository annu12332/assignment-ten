import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../AuthProvider';

const DashboardLayout = () => {
  const { user, logout } = useAuth();

  // Role check logic (Ekhane apni jodi Admin role thake seta check korben)
  const isAdmin = user?.email === "admin@pawmart.com"; 

  const sidebarLinks = (
    <div className="space-y-2">
      <li className="font-semibold text-gray-500 px-4 py-2 uppercase text-xs">Menu</li>
      <li><NavLink to="/dashboard/home" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>🏠 Overview</NavLink></li>
      <li><NavLink to="/dashboard/profile" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>👤 Profile</NavLink></li>
      
      {/* User specific routes */}
      {!isAdmin && (
        <>
          <li><NavLink to="/dashboard/my-orders" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>📦 My Orders</NavLink></li>
          <li><NavLink to="/dashboard/my-wishlist" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>❤️ Wishlist</NavLink></li>
        </>
      )}

      {/* Admin specific routes (Minimum 3 items) */}
      {isAdmin && (
        <>
          <li className="font-semibold text-gray-500 px-4 py-2 uppercase text-xs mt-4">Admin Panel</li>
          <li><NavLink to="/dashboard/manage-services" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>🛠️ Manage Listings</NavLink></li>
          <li><NavLink to="/dashboard/manage-users" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>👥 Manage Users</NavLink></li>
          <li><NavLink to="/dashboard/all-orders" className={({isActive}) => isActive ? "bg-primary text-white p-3 rounded-lg flex gap-2" : "p-3 flex gap-2 hover:bg-base-200 rounded-lg"}>🛒 All Orders</NavLink></li>
        </>
      )}
    </div>
  );

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col p-6 lg:p-10">
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between lg:hidden mb-6 bg-white p-4 rounded-xl shadow-sm">
          <label htmlFor="dashboard-drawer" className="btn btn-ghost drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <span className="font-bold text-xl">PawMart Dash</span>
        </div>

        {/* Main Dashboard Content Area */}
        <div className="bg-white min-h-[80vh] rounded-3xl shadow-sm p-6 lg:p-8">
            <Outlet /> {/* Ekhane baki page gulo load hobe */}
        </div>
      </div> 

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> 
        <ul className="menu p-6 w-80 min-h-full bg-white text-base-content border-r border-base-300">
          {/* Dashboard Logo */}
          <div className="mb-10 px-4">
             <h1 className="text-2xl font-bold text-primary italic">PawMart</h1>
             <p className="text-xs text-gray-400">Professional Pet Management</p>
          </div>
          {sidebarLinks}
          <div className="mt-auto pt-10">
             <button onClick={logout} className="btn btn-outline btn-error w-full rounded-xl">Logout</button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;