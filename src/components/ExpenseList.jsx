import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const ExpenseList = ({ transactions, onDelete, onDownload, onEmail }) => {
    const [loading, setLoading] = useState(false);

    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        } finally {
            setLoading(false);
        }
    }

    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-xl font-black text-white tracking-tight">Expense Sources</h5>
                <div className="flex items-center justify-end gap-2">
                    <button 
                        disabled={loading} 
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-semibold shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        onClick={handleEmail}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={16} />
                                Email
                            </>
                        )}
                    </button>
                    <button 
                        disabled={loading} 
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-semibold shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100" 
                        onClick={handleDownload}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin"/>
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={16} />
                                Download 
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* display the expenses */}
                {transactions?.map((expense) => (
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format('Do MMM YYYY')}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ExpenseList;