import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import IncomeList from "../components/IncomeList";
import Modal from "../components/Modal";
import AddIncomeForm from "../components/AddIncomeForm";
import DeleteAlert from "../components/DeleteAlert";
import IncomeOverview from "../components/IncomeOverview";

const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({ show: false, data: null });

    // Fetch income details
    const fetchIncomeDetails = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if (response.status === 200) {
                const incomeArray =
                    response.data?.data ||
                    response.data?.incomes ||
                    response.data || [];
                setIncomeData(incomeArray);
            }
        } catch (error) {
            console.error('Failed to fetch income details:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        } finally {
            setLoading(false);
        }
    }

    // Fetch categories
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"));
            if (response.status === 200) setCategories(response.data);
        } catch (error) {
            console.error('Failed to fetch income categories:', error);
            toast.error(error.response?.data?.message || "Failed to fetch income categories");
        }
    }

    // Add income
    const handleAddIncome = async (income) => {
        const { name, amount, date, icon, categoryId } = income;

        if (!name.trim()) return toast.error("Please enter a name");
        if (!amount || isNaN(amount) || Number(amount) <= 0) return toast.error("Amount must be greater than 0");
        if (!date) return toast.error("Please select a date");
        if (!categoryId) return toast.error("Please select a category");
        if (date > new Date().toISOString().split('T')[0]) return toast.error("Date cannot be in the future");

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            });

            if (response.status === 201) {
                setOpenAddIncomeModal(false);
                toast.success("Income added successfully");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        } catch (error) {
            console.error('Error adding income:', error);
            toast.error(error.response?.data?.message || "Failed to add income");
        }
    }

    // Delete income
    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error('Error deleting income:', error);
            toast.error(error.response?.data?.message || "Failed to delete income");
        }
    }

    // Download Excel
    const handleDownloadIncomeDetails = async () => {
        let loadingToast;

        try {
            loadingToast = toast.loading("Downloading income details...");

            const response = await axiosConfig.get(
                API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD,
                {
                    responseType: "arraybuffer",
                    timeout: 30000,
                    headers: {
                        "Content-Type": "application/octet-stream",
                        Accept: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    },
                }
            );

            toast.dismiss(loadingToast);

            // Extract filename
            let filename = "income_details.xlsx";
            const contentDisposition = response.headers["content-disposition"];

            if (contentDisposition) {
                const match = contentDisposition.match(/filename="?(.+)"?/);
                if (match && match[1]) {
                    filename = match[1];
                }
            }

            // Create Blob
            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            // Create download link
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = filename;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Income details downloaded successfully");

        } catch (error) {
            if (loadingToast) toast.dismiss(loadingToast);

            console.error("Error downloading income details:", error);

            // Handle server error returned as Blob
            if (error.response?.data instanceof Blob) {
                try {
                    const text = await error.response.data.text();
                    const json = JSON.parse(text);
                    toast.error(json.message || "Failed to download income details");
                    return;
                } catch (e) {}
            }

            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else if (error.code === "ECONNABORTED") {
                toast.error("Download timeout - please try again");
            } else if (!error.response) {
                toast.error("Network error - please check your connection");
            } else {
                toast.error("Failed to download income details");
            }
        }
    };

    // Email Excel
    const handleEmailIncomeDetails = async () => {
        let loadingToast;
        try {
            loadingToast = toast.loading("Sending income details...");
            const response = await axiosConfig.get(API_ENDPOINTS.EMAIL_INCOME);

            toast.dismiss(loadingToast);

            if (response.status === 200 && response.data.success) {
                toast.success(response.data.message || "Income details emailed successfully");
            } else {
                toast.error(response.data.message || "Failed to email income details");
            }
        } catch (error) {
            if (loadingToast) toast.dismiss(loadingToast);
            console.error("Error emailing income details:", error);
            toast.error(error.response?.data?.message || "Failed to email income details");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

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

            <Dashboard activeMenu="Income">
                <div className="my-5 mx-auto relative z-10">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                        </div>

                        <IncomeList 
                            transactions={incomeData} 
                            onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
                            onDownload={handleDownloadIncomeDetails}
                            onEmail={handleEmailIncomeDetails}
                        />

                        <Modal isOpen={openAddIncomeModal} onClose={() => setOpenAddIncomeModal(false)} title="Add Income">
                            <AddIncomeForm onAddIncome={handleAddIncome} categories={categories} />
                        </Modal>

                        <Modal isOpen={openDeleteAlert.show} onClose={() => setOpenDeleteAlert({ show: false, data: null })} title="Delete Income">
                            <DeleteAlert content="Are you sure you want to delete this income details?" onDelete={() => deleteIncome(openDeleteAlert.data)} />
                        </Modal>
                    </div>
                </div>
            </Dashboard>
        </div>
    );
};

export default Income;