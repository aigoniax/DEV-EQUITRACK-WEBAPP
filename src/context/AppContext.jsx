import { createContext, useState, useCallback, useMemo } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const clearUser = useCallback(() => {
        setUser(null);
    }, []);
    
    const contextValue = useMemo(() => ({
        user,
        setUser,
        clearUser
    }), [user, clearUser]);

    return(
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}