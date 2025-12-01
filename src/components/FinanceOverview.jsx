import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLORS = ["#9333ea", "#dc2626", "#16a34a"]; // Updated to match theme: purple, red, green

    const balanceData = [
        { name: "Total Balance", amount: totalBalance, color: "#9333ea" },
        { name: "Total Expenses", amount: totalExpense, color: "#dc2626" },
        { name: "Total Income", amount: totalIncome, color: "#16a34a" },
    ];
    
    return(
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-black text-white tracking-tight">Financial Overview</h5>
            </div>

            <CustomPieChart 
                data={balanceData}
                label="Total Balance"
                totalAmount={`₱${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}

export default FinanceOverview;