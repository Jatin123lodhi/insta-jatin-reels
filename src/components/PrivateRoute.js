import React from 'react'
import { Navigate } from 'react-router-dom';
import {  useAuth } from '../context/AuthContext'

export const PrivateRoute = ({children}) => {
    const {user} = useAuth(); 
    console.log("user in private route : ", user)
    return (
     user ? children : <Navigate to='/login' />
  )
}
