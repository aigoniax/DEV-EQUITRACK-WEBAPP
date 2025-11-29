import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { User, X } from "lucide-react";
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
        <div className={`${isMobile ? 'w-80 h-full fixed top-0 left-0 shadow-xl animate-slideIn' : 'w-64 h-[calc(100vh-73px)] sticky top-[73px]'} bg-white border-r border-gray-200/50 p-5 z-20 flex flex-col overflow-y-auto`}>
            {/* Mobile Header with Close Button */}
            {isMobile && (
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-800 rounded-full flex items-center justify-center">
                            <div className="w-5 h-5 border-4 border-white rounded-full"></div>
                        </div>
                        <span className="text-xl font-semibold">EquiTrack</span>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                        <X size={24} />
                    </button>
                </div>
            )}

            {/* User Profile Section */}
            <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                {user?.profileImageUrl ? (
                    <img 
                        src={user?.profileImageUrl || ""} 
                        alt="profile image" 
                        className="w-20 h-20 bg-slate-400 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-20 h-20 bg-pink-400 rounded-full flex items-center justify-center">
                        <User className="w-10 h-10 text-white" />
                    </div>
                )}
                <h5 className="text-gray-950 font-medium leading-6">{user?.fullName || "Guest User"}</h5>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1">
                {SIDE_BAR_DATA.map((item, index) => (
                    <button
                        onClick={() => handleNavigate(item.path)}
                        key={`menu_${index}`}
                        className={`cursor-pointer w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition-colors ${
                            activeMenu === item.label 
                                ? "text-white bg-purple-800" 
                                : "hover:bg-gray-100"
                        }`}
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;