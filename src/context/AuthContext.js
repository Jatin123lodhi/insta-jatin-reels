import React, {  createContext, useEffect, useState,useContext } from 'react'
import { auth, database } from '../firebase';

export const AuthContext = createContext();
//custom hook
export const useAuth = ()=>{
    return useContext(AuthContext);
}
export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null);
    //const [userData,setUserData] = useState(null);
    const [loading,setLoading] = useState(true);//why?

    function signup(email,password){
        return  auth.createUserWithEmailAndPassword(email,password)
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        console.log('calling logout')
        return auth.signOut();
    }
    function resetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }
    
    useEffect(()=>{
        const unsub = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false)
        })
        return ()=> unsub();
    },[user])

    const store =  {
        user,
        //userData,
        loading,
        signup,
        login,
        logout,
        resetPassword
    }
    //loading  why?
    return <AuthContext.Provider value={store}>{!loading &&  children}</AuthContext.Provider>
}

