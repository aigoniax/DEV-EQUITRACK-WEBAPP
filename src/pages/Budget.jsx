import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useContext, useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import BudgetOverview from "../components/BudgetOverview";
import BudgetList from "../components/BudgetList";
import Modal from "../components/Modal";
import AddBudgetForm from "../components/AddBudgetForm";
import DeleteAlert from "../components/DeleteAlert";
import { AppContext } from "../context/AppContext";

const Budget = () => {
    useUser();
    const { user } = useContext(AppContext);
    
    const [budgets, setBudgets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedPeriod, setSelectedPeriod] = useState('ALL'); // ALL, MONTHLY, WEEKLY

    const [openAddBudgetModal, setOpenAddBudgetModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    const profileId = user?.id;

    // Fetch all budgets
    const fetchBudgets = async () => {
        if (loading || !profileId) return;
        setLoading(true);

        try {
            console.log('Fetching budgets for profile:', profileId);
            const endpoint = selectedPeriod === 'ALL' 
                ? API_ENDPOINTS.GET_BUDGETS(profileId)
                : API_ENDPOINTS.GET_BUDGETS_BY_PERIOD(profileId, selectedPeriod);
                
            const response = await axiosConfig.get(endpoint);
            if (response.status === 200) {
                setBudgets(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch budgets:', error);
            toast.error(error.response?.data?.message || "Failed to fetch budgets");
        } finally {
            setLoading(false);
        }
    };

    // Fetch expense categories
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                setCategories(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
            toast.error("Failed to fetch categories");
        }
    };

    // Create new budget
    const handleAddBudget = async (budgetData) => {
        const { categoryId, limitAmount, period, description } = budgetData;

        if (!categoryId) {
            return toast.error("Please select a category");
        }

        if (!limitAmount || isNaN(limitAmount) || Number(limitAmount) <= 0) {
            return toast.error("Budget limit must be greater than 0");
        }

        if (!period) {
            return toast.error("Please select a period");
        }

        if (!profileId) {
            return toast.error("User profile not found. Please refresh and try again.");
        }

        try {
            console.log('Creating budget for profile:', profileId);
            const response = await axiosConfig.post(API_ENDPOINTS.CREATE_BUDGET(profileId), {
                categoryId: Number(categoryId),
                limitAmount: Number(limitAmount),
                period,
                description: description || ""
            });

            if (response.status === 200) {
                setOpenAddBudgetModal(false);
                toast.success("Budget created successfully");
                fetchBudgets();
            }
        } catch (error) {
            console.error('Error creating budget:', error);
            toast.error(error.response?.data?.message || error.response?.data || "Failed to create budget");
        }
    };

    // Delete budget
    const deleteBudget = async (budgetId) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_BUDGET(budgetId));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Budget deleted successfully");
            fetchBudgets();
        } catch (error) {
            console.error('Error deleting budget:', error);
            toast.error(error.response?.data?.message || "Failed to delete budget");
        }
    };

    useEffect(() => {
        if (!profileId) {
            console.log('⏳ Waiting for user profile...');
            return;
        }
        
        console.log('✅ Profile ID loaded:', profileId);
        fetchBudgets();
        fetchExpenseCategories();
    }, [profileId, selectedPeriod]);

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

            <Dashboard activeMenu="Budgets">
                <div className="my-5 mx-auto relative z-10">
                    <div className="grid grid-cols-1 gap-6">
                        {/* Budget Overview */}
                        <BudgetOverview 
                            budgetCount={budgets.length}
                            onAddBudget={() => setOpenAddBudgetModal(true)}
                            selectedPeriod={selectedPeriod}
                            onPeriodChange={setSelectedPeriod}
                        />

                        {/* Budget List */}
                        <BudgetList
                            budgets={budgets}
                            onDelete={(budgetId) => setOpenDeleteAlert({ show: true, data: budgetId })}
                        />

                        {/* Add Budget Modal */}
                        <Modal 
                            isOpen={openAddBudgetModal} 
                            onClose={() => setOpenAddBudgetModal(false)} 
                            title="Create New Budget"
                        >
                            <AddBudgetForm 
                                onSubmit={handleAddBudget}
                                categories={categories}
                            />
                        </Modal>

                        {/* Delete Confirmation */}
                        <Modal 
                            isOpen={openDeleteAlert.show} 
                            onClose={() => setOpenDeleteAlert({ show: false, data: null })} 
                            title="Delete Budget"
                        >
                            <DeleteAlert 
                                content="Are you sure you want to delete this budget? This action cannot be undone." 
                                onDelete={() => deleteBudget(openDeleteAlert.data)} 
                            />
                        </Modal>
                    </div>
                </div>
            </Dashboard>
        </div>
    );
};

export default Budget;