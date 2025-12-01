import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const InfoCard = ({icon, label, value, color, trend}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 p-6 hover:border-yellow-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-yellow-400/20">
            {/* Animated gradient overlay on hover */}
            <div className={`absolute inset-0 ${color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
            
            {/* Subtle glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/0 via-yellow-400/5 to-yellow-400/0 opacity-0 group-hover:opacity-100 blur transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 flex items-center justify-center text-white ${color} rounded-2xl shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <div className="text-[28px]">{icon}</div>
                    </div>

                    <div>
                        <h6 className="text-sm text-gray-400 font-medium mb-1">{label}</h6>
                        <span className="text-2xl font-bold text-white">
                            ₱{value}
                        </span>
                    </div>
                </div>

                {trend && (
                    <div className={`flex items-center gap-1 px-3 py-1.5 rounded-full ${trend > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} text-sm font-bold`}>
                        {trend > 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                        {Math.abs(trend)}%
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoCard;