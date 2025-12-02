import { LoaderCircle } from "lucide-react";
import React, { useState } from "react";

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false);
    
    const handleDelete = async () => {
        setLoading(true);
        try {
            await onDelete();
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div>
            <p className="text-sm text-gray-300 font-medium leading-relaxed">{content}</p>
            <div className="flex justify-end gap-3 mt-6">
                <button 
                    onClick={handleDelete}
                    disabled={loading}
                    type="button"
                    className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold shadow-lg hover:shadow-red-600/40 hover:scale-105 transition-all inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={2.5}/>
                            Deleting...
                        </>
                    ) : (
                        <>
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;