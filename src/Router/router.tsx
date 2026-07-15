import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
// import AddDoctors from "../Dashboard/DashboardPages/AddDoctors";
import DashboardHome from "../Dashboard/DashboardPages/Authority/Home/DashboardHome";
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
                Component: Clinics
            },
            {
                path: "contacts",
                Component: Contact
            },
            {
                path: "find-doctors",
                Component: FindDoctors
            },
            {
                path: "clinic/:id",
                Component: ClinicsDetails
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