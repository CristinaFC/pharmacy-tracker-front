import React from 'react'
import { useAuth } from "../context/authContext";
import {Navigate } from 'react-router-dom';
import Routing from './Routing';

export function ProtectedRoute  ({children}) {
    const { user, loading } = useAuth();
    
    // if (loading) return <Navigate to={Routing.login}/>
    if (!user) return <Navigate to={Routing.login}/>

    return <>{children}</>;

}
