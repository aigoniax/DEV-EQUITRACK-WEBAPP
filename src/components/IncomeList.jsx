import { Download, LoaderCircle, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard";
import moment from "moment";
import { useState } from "react";

const IncomeList = ({ transactions, onDelete, onDownload, onEmail }) => {
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
                <h5 className="text-xl font-black text-white tracking-tight">Income Sources</h5>
                <div className="flex items-center justify-end gap-3">
                    <button 
                        disabled={loading} 
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleEmail}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" strokeWidth={2.5}/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={15} strokeWidth={2.5} />
                                Email
                            </>
                        )}
                    </button>
                    <button 
                        disabled={loading} 
                        className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-white font-semibold rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleDownload}
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="w-4 h-4 animate-spin" strokeWidth={2.5}/>
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={15} strokeWidth={2.5} />
                                Download 
                            </>
                        )}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* display the incomes */}
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList;