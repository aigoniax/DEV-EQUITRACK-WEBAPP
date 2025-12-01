import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User, X, Wallet } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeMenu, isMobile = false, onClose }) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
        if (isMobile && onClose) {
            onClose();
        }
    };

    return (
        <div className={`${isMobile ? 'w-80 h-full fixed top-0 left-0 shadow-2xl shadow-black/50 animate-slideIn' : 'w-64 h-[calc(100vh-73px)] sticky top-[73px]'} bg-gradient-to-b from-slate-800/95 to-slate-900/95 backdrop-blur-sm border-r border-white/10 p-5 z-20 flex flex-col overflow-y-auto`}>
            {/* Mobile Header with Close Button */}
            {isMobile && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3 group">
                        <div className="transform transition-transform group-hover:scale-110 group-hover:rotate-12">
                            <Wallet className="h-8 w-8 text-yellow-400" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-black text-white tracking-tight">
                            Equi<span className="text-yellow-400">Track</span>
                        </span>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-300 hover:text-white"
                    >
                        <X size={24} strokeWidth={2.5} />
                    </button>
                </div>
            )}

            {/* User Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-400/30 transition-all"></div>
                        <img 
                            src={user?.profileImageUrl || ""} 
                            alt="profile image" 
                            className="relative w-20 h-20 rounded-full object-cover border-2 border-yellow-400/30 group-hover:border-yellow-400/50 transition-all"
                        />
                    </div>
                ) : (
                    <div className="relative group">
                        <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-xl group-hover:bg-yellow-400/30 transition-all"></div>
                        <div className="relative w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-full flex items-center justify-center border-2 border-yellow-400/30 group-hover:border-yellow-400/50 transition-all shadow-lg">
                            <User className="w-10 h-10 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                )}
                <h5 className="text-white font-black tracking-tight">{user?.fullName || "Guest User"}</h5>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1">
                {SIDE_BAR_DATA.map((item, index) => (
                    <button
                        onClick={() => handleNavigate(item.path)}
                        key={`menu_${index}`}
                        className={`cursor-pointer w-full flex items-center gap-4 text-[15px] font-semibold py-3 px-6 rounded-xl mb-3 transition-all duration-300 ${
                            activeMenu === item.label 
                                ? "text-gray-900 bg-yellow-400 shadow-lg shadow-yellow-400/30 scale-105" 
                                : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-102"
                        }`}
                    >
                        <item.icon className="text-xl" strokeWidth={2.5} />
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
