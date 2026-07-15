import { Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import Footer from "../SharedComponents/Footer";
import Header from "../SharedComponents/Header";
import { Toaster } from "react-hot-toast";

const Root = () => {
    const { theme } = useAuth()

    return (
        <div className={`${theme} flex flex-col h-dvh`}>
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
            <Toaster/>
        </div>
    );
};

export default Root;