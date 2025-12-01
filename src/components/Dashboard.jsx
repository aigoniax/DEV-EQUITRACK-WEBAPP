import { useContext } from "react";
import Menubar from "./Menubar";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";

const Dashboard = ({ children, activeMenu }) => {
    const { user } = useContext(AppContext);

    return (
        <div className="h-screen flex flex-col overflow-hidden">
            <Menubar activeMenu={activeMenu} />
            
            {user && (
                <div className="flex flex-1 overflow-hidden">
                    {/* Desktop Sidebar - Hidden on mobile */}
                    <div className="hidden lg:block">
                        <Sidebar activeMenu={activeMenu} />
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto">
                        <div className="mx-5">{children}</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;