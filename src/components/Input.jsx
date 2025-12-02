import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({label, value, onChange, placeholder, type, isSelect, options}) => {
    const[showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    
    return (
        <div className="mb-4">
            <label className="text-sm text-white font-semibold block mb-2">
                {label}
            </label>

            <div className="relative">
                {isSelect ? (
                    <select
                        className="w-full bg-slate-800/50 backdrop-blur-sm outline-none border border-white/20 rounded-xl py-3 px-4 text-white font-medium leading focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all hover:border-white/30"
                        value={value}
                        onChange={(e) => onChange(e)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value} className="bg-slate-800 text-white">
                                {option.label}
                            </option>
                        ))}
                    </select>
                ): (
                    <input 
                        className="w-full bg-slate-800/50 backdrop-blur-sm outline-none border border-white/20 rounded-xl py-3 px-4 pr-10 text-white font-medium placeholder-gray-400 leading-tight focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all hover:border-white/30"
                        type={type === "password" ? (showPassword ? "text" : "password") : type} 
                        placeholder={placeholder} 
                        value={value} 
                        onChange={(e) => onChange(e)} />
                )}

                {type === "password" && (
                    <span 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-yellow-400 transition-colors">
                        {showPassword ?(
                            <Eye
                                size={20}
                                className="text-yellow-400" 
                                onClick={toggleShowPassword}
                                strokeWidth={2.5}
                            />
                        ): (
                            <EyeOff
                                size={20}
                                onClick={toggleShowPassword}
                                strokeWidth={2.5}
                            />
                        )}
                    </span> 
                )}
            </div>
        </div>
    )   
}

export default Input;