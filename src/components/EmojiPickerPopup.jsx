import { useState } from "react";
import { Image, X } from "lucide-react";
import EmojiPicker, { Emoji } from "emoji-picker-react";

const EmojiPickerPopup = ({icon, onSelect}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleEmojiClick = (emoji) => {
        onSelect(emoji?.imageUrl || "");
        setIsOpen(false);
    }
    return (
        <div className="flex flex-col md:flex-row items-start gap-5 mb-6">
            <div
                onClick={() => setIsOpen(true)}
                className="flex items-center gap-4 cursor-pointer group">
                <div className="w-14 h-14 flex items-center justify-center text-2xl bg-gradient-to-br from-slate-700 to-slate-800 border border-white/20 rounded-xl shadow-lg group-hover:scale-110 group-hover:border-yellow-400/30 transition-all duration-300">
                    {icon ? (
                        <img src={icon} alt="Icon" className="w-8 h-8" />
                    ): (
                        <Image className="text-yellow-400" size={24} />
                    )}
                </div>
                <p className="text-white font-semibold group-hover:text-yellow-400 transition-colors">
                    {icon ? "Change icon" : "Pick Icon"}
                </p>
            </div>

            {isOpen && (
                <div className="relative">
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-700 hover:bg-slate-600 border border-white/20 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer transition-all duration-200 shadow-lg">
                        <X className="text-white" size={16} />
                    </button>
                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={handleEmojiClick}
                    />
                </div>
            )}
        </div>
    )
}

export default EmojiPickerPopup;