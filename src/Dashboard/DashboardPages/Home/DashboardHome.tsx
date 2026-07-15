// import React from 'react';
import useRole from '../../../Hooks/useRole';
import { Navigate } from 'react-router';
import AdminHome from '../Admin/AdminHome';

const DashboardHome = () => {
    // const navigate = useNavigate()
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return "Loading"
    }
    if (role === "user") {
        // navigate()
        return <Navigate to={"/dashboard/my-appointment"}></Navigate>

    }
    if (role === "admin") {
        // navigate()
        return <AdminHome></AdminHome>

    }
    return (
        <div>
            Home1
        </div>
    );
};

export default DashboardHome;