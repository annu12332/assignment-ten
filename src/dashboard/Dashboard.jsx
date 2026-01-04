import React, { useContext } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import { Authcontext } from '../AuthProvider';
import { 
  RiLayoutMasonryLine, 
  RiAddCircleLine, 
  RiListSettingsLine, 
  RiShoppingBag3Line, 
  RiLogoutBoxRLine,
  RiUserLine,
  RiArrowLeftLine
} from "react-icons/ri";

const Dashboard = () => {
    const { user, logOut } = useContext(Authcontext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut().then(() => navigate('/'));
    };

    const menuItems = [
        { label: 'Overview', path: '/dashboardhome', icon: <RiLayoutMasonryLine />, end: true },
        { label: 'Add Listing', path: '/dashboard/add', icon: <RiAddCircleLine /> },
        { label: 'My Listings', path: '/dashboard/manage-services', icon: <RiListSettingsLine /> },
        { label: 'My Orders', path: '/dashboard/my-orders', icon: <RiShoppingBag3Line /> },
    ];

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50">
            {/* Sidebar */}
            <div className="w-full lg:w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
                <div className="flex items-center gap-2 mb-10 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="bg-primary p-2 rounded-lg text-white">
                        <RiArrowLeftLine />
                    </div>
                    <span className="font-bold text-xl text-slate-800">PawMart</span>
                </div>

                <div className="flex-grow">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">Menu</p>
                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end={item.end}
                                className={({ isActive }) => 
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                                        isActive 
                                        ? 'bg-primary text-white shadow-md shadow-primary/20' 
                                        : 'text-slate-600 hover:bg-slate-100'
                                    }`
                                }
                            >
                                <span className="text-xl">{item.icon}</span>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Bottom Profile Section */}
                <div className="mt-10 pt-6 border-t border-slate-100 text-center lg:text-left">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <img 
                            src={user?.photoURL || "https://i.ibb.co/0Q1mf9X/user.png"} 
                            alt="profile" 
                            className="w-10 h-10 rounded-full border-2 border-primary/20"
                        />
                        <div className="overflow-hidden">
                            <p className="font-bold text-sm truncate text-slate-800">{user?.displayName}</p>
                            <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleLogOut}
                        className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
                    >
                        <RiLogoutBoxRLine className="text-xl" />
                        Log Out
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 lg:p-10 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;