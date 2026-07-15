import React from 'react';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';

const AuthorityRoute = ({ children }: { children: React.ReactNode }) => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <div className='h-dvh flex items-center justify-center'>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    if (role !== "authority") {
        return <Forbidden />
    }
    if (role === "authority") {
        return children
    }
   
};

export default AuthorityRoute;