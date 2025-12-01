import { X } from "lucide-react";

const Modal = ({isOpen, onClose, children, title}) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-hidden bg-black/60 backdrop-blur-md">
            <div className="relative p-4 w-full max-w-2xl max-h-[90vh]">
                {/* Modal container */}
                <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
                    {/* Modal header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10">
                        <h3 className="text-xl font-bold text-white">
                            {title}
                        </h3>

                        <button 
                            onClick={onClose}
                            type="button"
                            className="text-gray-400 bg-slate-700/50 hover:bg-slate-700 hover:text-white rounded-lg text-sm w-9 h-9 flex justify-center items-center transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-yellow-400">
                            <X className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Modal body */}
                    <div className="p-6 [&_input]:text-white [&_select]:text-white [&_label]:text-white [&_button]:text-gray-900">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;