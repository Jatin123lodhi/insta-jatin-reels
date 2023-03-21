import {  useContext, useEffect, useState,createContext } from "react";
import { database } from "../firebase";
import { useAuth } from "./AuthContext";

export const UserContext = createContext();
export const useUserData = ()=>{
    return  useContext(UserContext)
}
export const UserProvider = ({children})=>{
    const [userData,setUserData] = useState(null);
    const {user} = useAuth()
    useEffect(()=>{
        database.users.doc(user?.uid).onSnapshot((doc)=>{
            setUserData(doc.data());
        })
    },[user])
    const store = {
        userData
    }

    return <UserContext.Provider value={store} >{children}</UserContext.Provider>
}