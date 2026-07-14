import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate } from 'react-router';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {

    const { user, userLoading } = useAuth()

    if (userLoading) {
        return (
            <div className='h-dvh flex items-center justify-center'>
                <span className="loading loading-bars loading-xl"></span>
            </div>
        )
    }
    if (!user) {
        return <Navigate to={"/login"} />
    }

    return children

};

export default PrivateRoute;