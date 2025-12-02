import { Search, X } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard";
import moment from "moment";

const Filter = () => {
    useUser();
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async(e) => {
        e.preventDefault();
        setLoading(true);
        setHasSearched(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            });
            console.log('transactions: ', response.data);
            setTransactions(response.data);
            
            // Show message with count
            if (response.data.length === 0) {
                toast.error("No transactions found matching your criteria");
            } else {
                toast.success(`Found ${response.data.length} transaction${response.data.length > 1 ? 's' : ''}`);
            }
        }catch (error) {
            console.error('Failed to fetch transactions: ', error);
            toast.error(error.response?.data?.message || "Failed to fetch transactions. Please try again.");
        }finally {
            setLoading(false);
        }
    }

    const handleClearFilters = () => {
        setType("income");
        setStartDate("");
        setEndDate("");
        setKeyword("");
        setSortField("date");
        setSortOrder("asc");
        setTransactions([]);
        setHasSearched(false);
    }

    const handleTypeChange = (newType) => {
        setType(newType);
        // Clear transactions when switching type to avoid confusion
        if (hasSearched) {
            setTransactions([]);
            setHasSearched(false);
            toast.info(`Switched to ${newType}. Click search to see ${newType} transactions.`);
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-[#084062] to-blue-900 relative overflow-hidden">
            {/* Background Effects */}
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

            <Dashboard activeMenu="Filters">
                <div className="my-5 mx-auto relative z-10">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Filter Transactions</h2>
                        {hasSearched && (
                            <button
                                onClick={handleClearFilters}
                                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg font-semibold transition-all inline-flex items-center gap-2"
                            >
                                <X size={16} />
                                Clear Filters
                            </button>
                        )}
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 p-6 mb-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-bold text-white">Select the filters</h5>
                        </div>

                        <form className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4" onSubmit={handleSearch}>
                            <div>
                                <label className="block text-sm font-semibold mb-2 text-white" htmlFor="type">Type</label>
                                <select 
                                    value={type} 
                                    id="type" 
                                    className="w-full bg-slate-700/50 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    onChange={e => handleTypeChange(e.target.value)}
                                >
                                    <option value="income">Income</option>
                                    <option value="expense">Expense</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="startdate" className="block text-sm font-semibold mb-2 text-white">Start Date</label>
                                <input 
                                    value={startDate} 
                                    id="startdate" 
                                    type="date" 
                                    className="w-full bg-slate-700/50 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="enddate" className="block text-sm font-semibold mb-2 text-white">End Date</label>
                                <input 
                                    value={endDate} 
                                    id="enddate" 
                                    type="date" 
                                    className="w-full bg-slate-700/50 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="sortfield" className="block text-sm font-semibold mb-2 text-white">Sort Field</label>
                                <select 
                                    value={sortField} 
                                    id="sortfield" 
                                    className="w-full bg-slate-700/50 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    onChange={e => setSortField(e.target.value)}
                                >
                                    <option value="date">Date</option>
                                    <option value="amount">Amount</option>
                                    <option value="category">Category</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="sortorder" className="block text-sm font-semibold mb-2 text-white">Sort Order</label>
                                <select 
                                    value={sortOrder} 
                                    id="sortorder" 
                                    className="w-full bg-slate-700/50 border border-white/20 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                    onChange={e => setSortOrder(e.target.value)}
                                >
                                    <option value="asc">Ascending</option>
                                    <option value="desc">Descending</option>
                                </select>
                            </div>
                            <div className="sm:col-span-1 md:col-span-1 flex items-end">
                                <div className="w-full">
                                    <label htmlFor="keyword" className="block text-sm font-semibold mb-2 text-white">Search</label>
                                    <input 
                                        value={keyword} 
                                        id="keyword" 
                                        type="text" 
                                        placeholder="Search..." 
                                        className="w-full bg-slate-700/50 border border-white/20 text-white placeholder-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400" 
                                        onChange={e => setKeyword(e.target.value)}
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="ml-2 mb-1 p-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg flex items-center justify-center cursor-pointer transition-all hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </form>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 p-6 shadow-xl">
                        <div className="flex items-center justify-between mb-6">
                            <h5 className="text-xl font-bold text-white">
                                {hasSearched ? `${type.charAt(0).toUpperCase() + type.slice(1)} Transactions` : 'Transactions'}
                            </h5>
                            {hasSearched && transactions.length > 0 && (
                                <span className="text-sm text-gray-400">
                                    {transactions.length} result{transactions.length > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        
                        {!hasSearched ? (
                            <div className="text-center py-12">
                                <Search className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400 text-lg">
                                    Select the filters and click search to filter the transactions
                                </p>
                            </div>
                        ) : loading ? (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-400 text-lg">Loading Transactions...</p>
                            </div>
                        ) : transactions.length === 0 ? (
                            <div className="text-center py-12">
                                <X className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                                <p className="text-gray-400 text-lg font-semibold mb-2">
                                    No {type} transactions found
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {keyword ? `No results for "${keyword}". Try different search terms or filters.` : 'Try adjusting your filters or date range.'}
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {transactions.map((transaction) => (
                                    <TransactionInfoCard 
                                        key={transaction.id}
                                        title={transaction.name}
                                        icon={transaction.icon}
                                        date={moment(transaction.date).format('Do MMM YYYY')}
                                        amount={transaction.amount}
                                        type={type}
                                        hideDeleteBtn
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Dashboard>
        </div>
    )   
}

export default Filter;