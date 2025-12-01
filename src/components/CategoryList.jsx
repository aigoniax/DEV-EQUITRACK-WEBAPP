import { Layers2, Pencil } from "lucide-react";

const CategoryList = ({categories, onEditCategory}) => {
    return (
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
                <h4 className="text-xl font-bold text-white">Category Sources</h4>
            </div>
            
            {/* Category list */}
            {categories.length === 0 ? (
                <div className="text-center py-12">
                    <Layers2 className="w-16 h-16 text-gray-500 mx-auto mb-4 opacity-50" />
                    <p className="text-gray-400">
                        No categories added yet. Add some to get started!
                    </p>
                </div>
            ): (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map((category) => (
                        <div 
                            key={category.id}
                            className="group relative flex items-center gap-4 p-4 rounded-xl bg-slate-800/50 border border-white/10 hover:border-yellow-400/30 hover:bg-slate-800/70 transition-all duration-300">
                            {/* Icon/Emoji display */}
                            <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                {category.icon ? (
                                    <span className="text-2xl">
                                        <img src={category.icon} alt={category.name} className="h-6 w-6" />
                                    </span>
                                ): (
                                    <Layers2 className="text-yellow-400" size={24} />
                                )}
                            </div>

                            {/* Category Details */}
                            <div className="flex-1 flex items-center justify-between">
                                {/* Category name and type */}
                                <div>
                                    <p className="text-sm text-white font-semibold">
                                        {category.name}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1 capitalize">
                                        {category.type}
                                    </p>
                                </div>
                                {/* Action buttons */}
                                <div className="flex items-center gap-2">
                                    <button 
                                        onClick={() => onEditCategory(category)}
                                        className="p-2 rounded-lg text-gray-400 hover:text-yellow-400 hover:bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                                        <Pencil size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CategoryList;