import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import DashboardLayout from "../Dashboard/DashboardLayout/DashboardLayout";
import AddDoctors from "../Dashboard/DashboardPages/AddDoctors";
import DashboardHome from "../Dashboard/DashboardPages/Home/DashboardHome";
import AddClinic from "../Dashboard/DashboardPages/AddClinic";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: Root
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
        Component: DashboardLayout,
        children: [
            {
                index: true,
                Component: DashboardHome
            },

            {
                path: "add-clinic",
                Component: AddClinic
            },
            {
                path: "add-doctors",
                Component: AddDoctors
            },
        ]
    },



])