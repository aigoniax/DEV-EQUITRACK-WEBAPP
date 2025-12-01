import { Coins, Wallet, WalletCards } from "lucide-react";
import Dashboard from "../components/Dashboard";
import InfoCard from "../components/InfoCard";
import { useUser } from "../hooks/useUser";
import { addThousandsSeparator } from "../util/util";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import RecentTransactions from "../components/RecentTransactions";
import FinanceOverview from "../components/FinanceOverview";
import Transactions from "../components/Transactions";

const Home = () => {
    useUser();

    const navigate = useNavigate();
    const[dashboardData, setDashboardData] = useState(null);
    const[loading, setLoading] = useState(false);

    const fetchDashboardData = async() => {
        if(loading) return;

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.DASHBOARD_DATA);

            if(response.status === 200){
                setDashboardData(response.data);
            }
        }catch(error){
            console.error("Something went wrong while fetching dashboard data: ", error);
            toast.error("Something went wrong!");
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDashboardData();
        return () => {};
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden">
            {/* Background Effects matching landing page */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                <div className="absolute top-1/4 left-10 md:left-20 w-80 h-80 bg-yellow-400 rounded-full blur-3xl animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-10 md:right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                ></div>
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-400 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <Dashboard activeMenu="Dashboard">
                <div className="my-5 mx-auto relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <InfoCard
                            icon={<WalletCards />}
                            label="Total Balance"
                            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                            color="bg-gradient-to-br from-purple-600 to-purple-800"
                        />

                        <InfoCard
                            icon={<Wallet />}
                            label="Total Income"
                            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                            color="bg-gradient-to-br from-green-600 to-green-800"
                        />

                        <InfoCard
                            icon={<Coins />}
                            label="Total Expense"
                            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                            color="bg-gradient-to-br from-red-600 to-red-800"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Recent Transactions */}
                        <RecentTransactions 
                            transactions={dashboardData?.recentTransactions}
                            onMore={() => navigate("/expense")}
                        />

                        {/* Financial Overview chart */}
                        <FinanceOverview 
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />

                        {/* Expense Transactions */}
                        <Transactions 
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                        />

                        {/* Income Transactions */}
                        <Transactions 
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Recent Incomes"
                        />
                    </div>
                </div>
            </Dashboard>
        </div>
    )   
}

export default Home;