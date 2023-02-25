import React from 'react'
import useAuth from '../custom-hooks/customHook';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectedRouter = () => {

    const { currentUser } = useAuth()
    return currentUser ? <Outlet /> : <Navigate to='/login' />
}

export default ProtectedRouter