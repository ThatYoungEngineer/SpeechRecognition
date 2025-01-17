
import { createContext, useContext, useState } from "react";


const GlobalContext = createContext()

export const useGlobal = () => useContext(GlobalContext)

export const GlobalContextProvider = ({ children }) => {

    const [globalLanguage, setGlobalLanguage] = useState("english")


    const updateGlobalLanguage = (data) => {
        setGlobalLanguage(data)
    }

    return (    
        <GlobalContext.Provider value = {{ globalLanguage, updateGlobalLanguage }} >
            {children}
        </GlobalContext.Provider>
    )
}
