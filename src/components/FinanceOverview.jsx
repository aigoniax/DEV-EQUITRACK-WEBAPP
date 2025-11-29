import { addThousandsSeparator } from "../util/util";
import CustomPieChart from "./CustomPieChart";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense}) => {
    const COLORS = ["#591688", "#d0090e", "#016630"];

    const balanceData = [
    { name: "Total Balance", amount: totalBalance, color: "#591688" },
    { name: "Total Expenses", amount: totalExpense, color: "#d0090e" },
    { name: "Total Income", amount: totalIncome, color: "#016630" },
    ];
    
    return(
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
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