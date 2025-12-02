import { Plus, Target } from "lucide-react";

const BudgetOverview = ({ budgetCount, onAddBudget, selectedPeriod, onPeriodChange }) => {
    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h5 className="text-xl font-black text-white tracking-tight">
                        Budget Overview
                    </h5>
                    <p className="text-sm text-gray-400 mt-1 font-medium">
                        Set spending limits and track your budget goals
                    </p>
                </div>
                <button 
                    className="px-5 py-2.5 bg-yellow-400 text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all inline-flex items-center gap-2" 
                    onClick={onAddBudget}
                >
                    <Plus size={18} strokeWidth={2.5} /> New Budget
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Total Budgets Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-sm border border-green-400/30 p-6 hover:border-green-400/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-start justify-between">
                        <div className="flex-1">
                            <p className="text-gray-400 text-sm font-medium mb-2">Active Budgets</p>
                            <p className="text-4xl font-black text-white tracking-tight">{budgetCount}</p>
                            <p className="text-green-400 text-xs font-semibold mt-2">Categories tracked</p>
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-br from-green-600 to-green-800 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Target className="w-8 h-8 text-white" strokeWidth={2.5} />
                        </div>
                    </div>
                </div>

                {/* Period Filter Card */}
                <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-sm border border-blue-400/30 p-6 hover:border-blue-400/50 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10">
                        <p className="text-gray-400 text-sm font-medium mb-3">Filter by Period</p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => onPeriodChange('ALL')}
                                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                                    selectedPeriod === 'ALL'
                                        ? 'bg-yellow-400 text-gray-900 shadow-lg'
                                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => onPeriodChange('MONTHLY')}
                                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                                    selectedPeriod === 'MONTHLY'
                                        ? 'bg-yellow-400 text-gray-900 shadow-lg'
                                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => onPeriodChange('WEEKLY')}
                                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all ${
                                    selectedPeriod === 'WEEKLY'
                                        ? 'bg-yellow-400 text-gray-900 shadow-lg'
                                        : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
                                }`}
                            >
                                Weekly
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BudgetOverview;