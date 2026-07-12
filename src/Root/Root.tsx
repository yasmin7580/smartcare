import { Outlet } from "react-router";
import useAuth from "../Hooks/useAuth";
import Footer from "../SharedComponents/Footer";
import Header from "../SharedComponents/Header";

const Root = () => {
    const { theme } = useAuth()

    return (
        <div className={`${theme} flex flex-col h-dvh`}>
            <Header />
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Root;