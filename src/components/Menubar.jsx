import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X, Wallet } from "lucide-react";
import Sidebar from "./Sidebar";

const Menubar = ({ activeMenu }) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user, clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        clearUser();
        setShowDropdown(false);
        navigate("/landingpage");
    };

    const closeSidebar = () => {
        setOpenSideMenu(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showDropdown]);

    return (
        <>
            <div className="flex items-center justify-between gap-5 bg-gradient-to-r from-slate-800/95 to-slate-900/95 backdrop-blur-sm border-b border-white/10 py-4 px-4 sm:px-7 sticky top-0 z-30">
                {/* Left side - Menu button and title */}
                <div className="flex items-center gap-5">
                    <button
                        onClick={() => setOpenSideMenu(!openSideMenu)}
                        className="block lg:hidden text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
                    >
                        {openSideMenu ? (
                            <X className="text-2xl" strokeWidth={2.5} />
                        ) : (
                            <Menu className="text-2xl" strokeWidth={2.5} />
                        )}
                    </button>

                    <div className="flex items-center gap-3 group">
                        <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                            <Wallet className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight hidden sm:block">
                            Equi<span className="text-yellow-400">Track</span>
                        </span>
                    </div>
                </div>

                {/* Right side - Avatar photo */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-slate-900 overflow-hidden border-2 border-white/10 hover:border-yellow-400/30"
                    >
                        {user?.profileImageUrl ? (
                            <img 
                                src={user.profileImageUrl} 
                                alt={user.fullName || "Profile"} 
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <User className="text-yellow-400" strokeWidth={2.5} />
                        )}
                    </button>

                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-gradient-to-b from-slate-800/98 to-slate-900/98 backdrop-blur-sm rounded-xl shadow-2xl border border-white/10 py-1 z-50">
                            {/* User info */}
                            <div className="px-4 py-3 border-b border-white/10">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-8 h-8 bg-slate-700 rounded-full overflow-hidden border border-white/10">
                                        {user?.profileImageUrl ? (
                                            <img 
                                                src={user.profileImageUrl} 
                                                alt={user.fullName || "Profile"} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <User className="w-4 h-4 text-yellow-400" strokeWidth={2.5} />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white truncate">
                                            {user?.fullName || "User"}
                                        </p>
                                        <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Dropdown options */}
                            <div className="py-1">
                                <button
                                    onClick={() => { setShowDropdown(false); navigate('/profile'); }}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-150"
                                >
                                    <User className="w-4 h-4" strokeWidth={2.5} />
                                    <span>Profile</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 w-full px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-150"
                                >
                                    <LogOut className="w-4 h-4" strokeWidth={2.5} />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile side menu - Sliding drawer */}
            {openSideMenu && (
                <>
                    {/* Backdrop overlay */}
                    <div
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm lg:hidden z-40 top-[73px] animate-fadeIn"
                        onClick={closeSidebar}
                    />
                    
                    {/* Sidebar drawer */}
                    <div className="fixed top-[73px] left-0 lg:hidden z-50 h-[calc(100vh-73px)] animate-slideInLeft">
                        <Sidebar activeMenu={activeMenu} isMobile={true} onClose={closeSidebar} />
                    </div>
                </>
            )}
        </>
    );
};

export default Menubar;