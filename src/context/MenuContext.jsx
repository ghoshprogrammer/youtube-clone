
import {  createContext, useContext, useState } from "react";

const MenuContext=createContext()

export const MenuProvider=({children})=>{
    const [menu,setMenu]=useState(false)
    const [category,setCategory]=useState(0)
    return(
        <MenuContext.Provider value={{menu,setMenu,category,setCategory}}>
            {children}
        </MenuContext.Provider>
    )
}

export const useMenu=()=>{
    return useContext(MenuContext)
}