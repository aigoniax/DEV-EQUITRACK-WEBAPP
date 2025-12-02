import { useState, useEffect } from "react";
import { LoaderCircle } from "lucide-react";
import Input from "./Input";

const AddBudgetForm = ({ onSubmit, categories }) => {
    const [formData, setFormData] = useState({
        categoryId: '',
        limitAmount: '',
        period: 'MONTHLY',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
    }));

    const periodOptions = [
        { value: 'MONTHLY', label: 'Monthly' },
        { value: 'WEEKLY', label: 'Weekly' }
    ];

    useEffect(() => {
        if (categories.length > 0 && !formData.categoryId) {
            setFormData(prev => ({...prev, categoryId: categories[0].id}));
        }
    }, [categories, formData.categoryId]);

    const handleChange = (key, value) => {
        setFormData({...formData, [key]: value});
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await onSubmit(formData);
            setFormData({
                categoryId: categories[0]?.id || '',
                limitAmount: '',
                period: 'MONTHLY',
                description: ''
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Input
                label="Category"
                value={formData.categoryId}
                onChange={(e) => handleChange('categoryId', e.target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                label="Budget Limit (₱)"
                type="number"
                placeholder="e.g., 5000"
                value={formData.limitAmount}
                onChange={(e) => handleChange('limitAmount', e.target.value)}
            />

            <Input
                label="Period"
                value={formData.period}
                onChange={(e) => handleChange('period', e.target.value)}
                isSelect={true}
                options={periodOptions}
            />

            <Input
                label="Description (Optional)"
                type="text"
                placeholder="e.g., Monthly grocery budget"
                value={formData.description}
                onChange={(e) => handleChange('description', e.target.value)}
            />

            <div className="bg-slate-800/30 border border-white/10 rounded-xl p-4 mt-4 mb-6">
                <p className="text-gray-400 text-xs font-medium mb-2">💡 Tips:</p>
                <ul className="text-gray-400 text-xs space-y-1 list-disc list-inside">
                    <li>Set realistic budget limits based on your spending habits</li>
                    <li>Choose monthly budgets for recurring expenses</li>
                    <li>Weekly budgets work well for groceries and dining</li>
                    <li>You'll get alerts when you reach 80% of your limit</li>
                </ul>
            </div>

            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-2.5 bg-yellow-400 text-gray-900 rounded-xl font-bold shadow-lg hover:shadow-yellow-400/40 hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center gap-2"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="w-4 h-4 animate-spin" strokeWidth={2.5} />
                            Creating...
                        </>
                    ) : (
                        <>
                            Create Budget
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddBudgetForm;