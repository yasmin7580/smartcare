import React from 'react';
import useRole from '../../../../Hooks/useRole';
import { useNavigate } from 'react-router';

const DashboardHome = () => {
    const navigate = useNavigate()
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return "Loading"
    }
    if (role === "user") {
        navigate("/dashboard/my-appointment")
    }
    return (
        <div>
            Home
        </div>
    );
};

export default DashboardHome;