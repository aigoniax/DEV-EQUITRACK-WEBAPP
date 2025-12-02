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
                        <Image className="text-yellow-400" size={24} strokeWidth={2.5} />
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
                        <X className="text-white" size={16} strokeWidth={2.5} />
                    </button>
                    
                    {/* Wrapper with custom dark theme styling */}
                    <div className="emoji-picker-dark-theme">
                        <EmojiPicker
                            open={isOpen}
                            onEmojiClick={handleEmojiClick}
                            theme="dark"
                            searchPlaceHolder="Search emoji..."
                            previewConfig={{
                                showPreview: false
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Custom CSS for emoji picker dark theme */}
            <style jsx>{`
                .emoji-picker-dark-theme aside.EmojiPickerReact {
                    --epr-bg-color: #1e293b !important;
                    --epr-category-label-bg-color: #0f172a !important;
                    --epr-picker-border-color: rgba(255, 255, 255, 0.1) !important;
                    --epr-search-input-bg-color: #475569 !important;
                    --epr-search-input-text-color: #ffffff !important;
                    --epr-search-input-placeholder-color: #cbd5e1 !important;
                    --epr-search-border-color: rgba(255, 255, 255, 0.3) !important;
                    --epr-category-icon-active-color: #facc15 !important;
                    --epr-skin-tone-picker-menu-color: #1e293b !important;
                    --epr-horizontal-padding: 10px !important;
                    --epr-text-color: #ffffff !important;
                    --epr-category-label-text-color: #ffffff !important;
                    --epr-hover-bg-color: rgba(250, 204, 21, 0.1) !important;
                    border-radius: 1rem !important;
                    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2) !important;
                    backdrop-filter: blur(8px) !important;
                }

                .emoji-picker-dark-theme .epr-search {
                    background-color: #475569 !important;
                    border: 1px solid rgba(255, 255, 255, 0.3) !important;
                    border-radius: 0.75rem !important;
                    padding: 0.5rem !important;
                }

                .emoji-picker-dark-theme .epr-search input {
                    color: #ffffff !important;
                    font-weight: 600 !important;
                    background-color: transparent !important;
                }

                .emoji-picker-dark-theme .epr-search input::placeholder {
                    color: #cbd5e1 !important;
                    font-weight: 500 !important;
                }

                .emoji-picker-dark-theme .epr-search input:focus {
                    outline: none !important;
                    color: #ffffff !important;
                }

                .emoji-picker-dark-theme .epr-category-nav button.epr-cat-btn {
                    transition: all 0.2s !important;
                }

                .emoji-picker-dark-theme .epr-category-nav button.epr-cat-btn:hover {
                    background-color: rgba(250, 204, 21, 0.1) !important;
                }

                .emoji-picker-dark-theme .epr-category-nav button.epr-cat-btn.epr-active {
                    background-color: rgba(250, 204, 21, 0.2) !important;
                }

                .emoji-picker-dark-theme .epr-emoji-category-label {
                    color: #ffffff !important;
                    font-weight: 700 !important;
                    font-size: 0.875rem !important;
                    background: linear-gradient(to bottom, #0f172a 0%, #1e293b 100%) !important;
                    padding: 0.5rem !important;
                    border-radius: 0.5rem !important;
                    margin-bottom: 0.5rem !important;
                }

                .emoji-picker-dark-theme button.epr-emoji {
                    transition: all 0.2s !important;
                    border-radius: 0.5rem !important;
                }

                .emoji-picker-dark-theme button.epr-emoji:hover {
                    background-color: rgba(250, 204, 21, 0.15) !important;
                    transform: scale(1.1) !important;
                }
            `}</style>
        </div>
    )
}

export default EmojiPickerPopup;