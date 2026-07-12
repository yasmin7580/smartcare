import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

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
    }

])