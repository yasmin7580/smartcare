import React from 'react';
import useRole from '../Hooks/useRole';
import Forbidden from '../Components/Forbidden';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return <div>
            <span className="loading loading-bars loading-xl"></span>
        </div>
    }
    if (role !== "admin") {
        return <Forbidden />
    }
    if (role === "admin") {
        return children
    }

};

export default AdminRoute;