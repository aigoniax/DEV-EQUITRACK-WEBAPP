import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import CustomLineChart from "./IncomeLineChart.jsx";
import { prepareIncomeLineChartData } from "../util/chartUtils.js";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);
    
    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);
    }, [transactions]);
    
    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-xl font-black text-white tracking-tight">
                        Income Overview    
                    </h5>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button 
                    className="px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all inline-flex items-center gap-2" 
                    onClick={onAddIncome}
                >
                    <Plus size={18} strokeWidth={2.5} /> Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview;