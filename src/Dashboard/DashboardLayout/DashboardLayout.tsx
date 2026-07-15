import { Menu } from 'lucide-react';
// import React from 'react';
import { NavLink, Outlet } from 'react-router';
import "./DashboardLayout.css"
import useRole from '../../Hooks/useRole';
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
    const { role, roleLoading } = useRole()
    if (roleLoading) {
        return "Loading"
    }
    return (
        <div className="drawer lg:drawer-open">
            <Toaster />
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <Outlet />
                <label htmlFor="my-drawer-3" className="btn drawer-button justify-start lg:hidden w-full">
                    <Menu />
                </label>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 min-h-full w-80 p-4 ">
                    {
                        role === "user" &&
                        <>
                            <li><NavLink to={"."} end >MyAppointment</NavLink></li>
                            <li><NavLink to={"."}  >MyProfile</NavLink></li>
                        </>


                    }



                    {/* Sidebar content here */}
                    {
                        role === "authority" &&
                        <>
                            <li><NavLink to={"."} end >Home</NavLink></li>
                            <li><NavLink to={"add-clinic"} >Add Clinic</NavLink></li>
                            <li><NavLink to={"add-doctors"}>Add Doctors</NavLink></li>
                            <li><NavLink to={"doctors"}>Doctors</NavLink></li>
                            <li><NavLink to={"total-appointments"}>Total Appointments</NavLink></li>

                        </>
                    }
                    {
                        role === "admin" &&
                        <>
                            <li><NavLink to={"all-users"} end >All Users</NavLink></li>
                            <li><NavLink to={"medical-authority"}  >Medical Authority</NavLink></li>

                        </>
                    }

                    <button className='btn bg-gray-400 text-white mt-auto'>Logout</button>

                </ul>
            </div>
        </div >
    );
};

export default DashboardLayout;