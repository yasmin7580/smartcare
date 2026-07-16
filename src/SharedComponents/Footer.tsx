// import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router";

// type UserRole = "patient" | "doctor" | "admin" | null;

// type FooterProps = {
//     user: boolean;
//     role: UserRole;
// };

const Footer = () => {
    const guestLinks = [
        { name: "Home", path: "/" },
        // { name: "Doctors", path: "/doctors" },
        { name: "About", path: "/about" },
        { name: "Contact", path: "/contacts" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
    ];
    const serviceLinks = [
        // { name: "Home", path: "/" },
        // // { name: "Doctors", path: "/doctors" },
        // { name: "About", path: "/about" },
        // { name: "Contact", path: "/contacts" },
        { name: "Login", path: "/login" },
        { name: "Register", path: "/register" },
    ];



    return (
        <footer className="bg-red-700 text-white">
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link to="/" className="text-3xl font-bold">
                            Smart<span className="text-red-200">Care</span>
                        </Link>

                        <p className="mt-4 text-sm leading-7 text-white/80">
                            SmartCare makes healthcare easier by connecting patients with
                            trusted doctors through a simple and secure appointment booking
                            system.
                        </p>

                        <div className="mt-6 flex gap-4">
                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-red-700"
                            >
                                {/* <Facebook size={18} /> */}
                                <FaFacebook />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-red-700"
                            >
                                <FaInstagram size={18} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-red-700"
                            >
                                <FaTwitter size={18} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-red-700"
                            >
                                <FaLinkedin size={18} />
                            </a>

                            <a
                                href="#"
                                className="rounded-full bg-white/10 p-2 transition hover:bg-white hover:text-red-700"
                            >
                                <FaGithub size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-xl font-semibold">Quick Links</h3>

                        <ul className="space-y-3">
                            {guestLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="text-white/80 transition hover:pl-2 hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="mb-4 text-xl font-semibold">Services</h3>

                        <ul className="space-y-3">
                            {serviceLinks.map((service) => (
                                <li key={service.path}>
                                    <Link
                                        to={service.path}
                                        className="text-white/80 transition hover:pl-2 hover:text-white"
                                    >
                                        {service.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="mb-4 text-xl font-semibold">Contact</h3>

                        <div className="space-y-3 text-white/80">
                            <p>Rajbari, Dhaka, Bangladesh</p>
                            <p>support@smartcare.com</p>
                            <p>+880 1XXX-XXXXXX</p>
                            <p>24/7 Emergency Support</p>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/70 md:flex-row">
                    <p>© {new Date().getFullYear()} SmartCare. All rights reserved.</p>

                    <div className="flex gap-6">
                        <Link to="/privacy" className="hover:text-white">
                            Privacy Policy
                        </Link>

                        <Link to="/terms" className="hover:text-white">
                            Terms & Conditions
                        </Link>

                        <Link to="/cookies" className="hover:text-white">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;