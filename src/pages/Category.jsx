import { Plus } from "lucide-react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../hooks/useUser";
import CategoryList from "../components/CategoryList";
import { useEffect, useState } from "react";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if (response.status === 201 || response.status === 200) {
                console.log('categories', response.data);
                setCategoryData(response.data);
            }
        }catch(error) {
            console.error('Something went wrong. Please try again.', error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;

        if(!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        //check if the category already exists, dli ni ai ha basin ai napod nya ni grrr
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if(isDuplicate) {
            toast.error("Category name already exists");
            return;
        }


        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if (response.status === 200 || response.status === 201) {
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            } 
        }catch (error) {
                console.error('Error adding category', error);
                toast.error(error.response?.data?.message || "Failed to add category.");
                return;
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} =  updatedCategory;

        if(!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        if(!id) {
            toast.error("Invalid category ID");
            return;
        }

        try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        }catch(error) {
            console.error('Error updating category', error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category.");
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

            <Dashboard activeMenu="Category">
                <Toaster position="top-center" />
                <div className="my-5 mx-auto relative z-10">
                    {/* Add button to add category */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">All Categories</h2>
                        <button 
                            onClick={() => setOpenAddCategoryModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all">
                            <Plus size={18} />
                            Add Category
                        </button>
                    </div>

                    {/* Category list */}
                    <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                    {/* Adding category modal */}
                    <Modal
                        isOpen={openAddCategoryModal}
                        onClose={() => setOpenAddCategoryModal(false)}
                        title="Add Category"
                    >
                        <AddCategoryForm onAddCategory={handleAddCategory}/>
                    </Modal>

                    {/* Updating category modal */}
                    <Modal
                        onClose={() => {
                            setOpenEditCategoryModal(false);
                            setSelectedCategory(null);
                        }}
                        isOpen={openEditCategoryModal}
                        title="Update Category"
                    >
                        <AddCategoryForm
                            initialCategoryData={selectedCategory}
                            onAddCategory={handleUpdateCategory}
                            isEditing={true}
                        />
                    </Modal>
                </div>
            </Dashboard>
        </div>
    )
}

export default Category;