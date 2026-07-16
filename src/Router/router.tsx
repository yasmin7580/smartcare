import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
// import AddDoctors from "../Dashboard/DashboardPages/AddDoctors";
import DashboardHome from "../Dashboard/DashboardPages/Home/DashboardHome";
import AddClinic from "../Dashboard/DashboardPages/Authority/AddClinic";
import PrivateRoute from "../PrivateRoutes/PrivateRoute";
import AddDoctors from "../Dashboard/DashboardPages/Authority/AddDoctors";
import MedicalAuthority from "../Dashboard/DashboardPages/Admin/MedicalAuthority";
import AuthorityRoute from "../PrivateRoutes/AuthorityRoute";
import AdminRoute from "../PrivateRoutes/AdminRoute";
import AllUsers from "../Dashboard/DashboardPages/Admin/AllUsers";
import Doctors from "../Dashboard/DashboardPages/Authority/Doctors";
import UserRoute from "../PrivateRoutes/UserRoute";
import MyAppointment from "../Dashboard/DashboardPages/User/MyAppointment";
import MyProfile from "../Dashboard/DashboardPages/User/MyProfile";
import Home from "../Pages/Home/Home";
// import Hospitals from "../Pages/User/Clinics";
import Clinics from "../Pages/User/Clinics";
import Contact from "../Pages/Contact";
import FindDoctors from "../Pages/FindDoctors";
import ClinicsDetails from "../Pages/User/ClinicsDetails";
import DoctorDetails from "../Pages/DoctorDetails";
import TotalAppointment from "../Dashboard/DashboardPages/Authority/TotalAppointment";
import About from "../Pages/About";
// import type PrivateRoute from "../PrivateRoutes/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home

            },
            {
                path: "clinics",
                element: <UserRoute><Clinics></Clinics></UserRoute>
            },

            {
                path: "find-doctors",
                element: <UserRoute><FindDoctors></FindDoctors></UserRoute>

            },
            {
                path: "clinic/:id",
                element: <UserRoute><ClinicsDetails></ClinicsDetails></UserRoute>

            },
            {
                path: "doctor/:id",
                element: <UserRoute><DoctorDetails></DoctorDetails></UserRoute>

            },
            {
                path: "contacts",
                Component: Contact
            },
            {
                path: "about",
                Component: About
            },

        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/register",
        Component: Register
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true,
                Component: DashboardHome
            },
            // user
            {
                path: "my-appointment",
                element: <UserRoute><MyAppointment></MyAppointment></UserRoute>
            },
            {
                path: "my-profile",
                element: <UserRoute><MyProfile></MyProfile></UserRoute>
            },
            // authority
            {
                path: "doctors",
                element: <AuthorityRoute><Doctors /></AuthorityRoute>
            },
            {
                path: "add-clinic",
                element: <AuthorityRoute><AddClinic /> </AuthorityRoute>
            },
            {
                path: "add-doctors",
                element: <AuthorityRoute><AddDoctors /></AuthorityRoute>
            },
            {
                path: "total-appointments",
                element: <AuthorityRoute><TotalAppointment></TotalAppointment></AuthorityRoute>
            },
            // admin
            {
                path: "medical-authority",
                element: <AdminRoute><MedicalAuthority /></AdminRoute>
            },
            {
                path: "all-users",
                element: <AdminRoute><AllUsers /></AdminRoute>
            }
        ]
    },



])
