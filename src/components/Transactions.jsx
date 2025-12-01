import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard";

const Transactions = ({transactions, onMore, type, title}) => {
    return(
        <div className="rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-white/10 p-6 hover:border-yellow-400/30 transition-all duration-300">
            <div className="flex items-center justify-between">
                <h5 className="text-xl font-black text-white tracking-tight">{title}</h5>
                <button 
                    className="text-yellow-400 hover:text-yellow-300 text-sm font-semibold flex items-center gap-1 group transition-colors" 
                    onClick={onMore}
                >
                    More 
                    <ArrowRight 
                        className="group-hover:translate-x-0.5 transition-transform" 
                        size={15}
                    />
                </button>
            </div>

            <div className="mt-6">
                {transactions?.slice(0, 5)?.map(item => (
                    <TransactionInfoCard
                      key={item.id}
                      title={item.name}
                      icon={item.icon}
                      date={moment(item.date).format("Do MMM YYYY")}
                      amount={item.amount}
                      type={item.type}
                      hideDeleteBtn                          
                    />
                ))}
            </div>
        </div>
    )
}

export default Transactions;