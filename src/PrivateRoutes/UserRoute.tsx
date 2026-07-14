import React, { Children } from 'react';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';

const UserRoute = ({ children }: { children: React.ReactNode }) => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <div className='h-dvh flex items-center justify-center'>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    if (role !== "user") {
        return <Forbidden />
    }
    if (role === "user") {
        return children
    }
   
};

export default UserRoute;