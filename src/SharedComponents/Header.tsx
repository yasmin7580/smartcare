import { Link, NavLink } from 'react-router';
import "./header.css"
import useAuth from '../Hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase.init';
import Swal from 'sweetalert2'
import { useState } from 'react';


const Header = () => {

    const { user } = useAuth()
    const [dropDown, setDropdown] = useState<boolean>(false)
    console.log(user)


    const links = <>

        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="find-doctors">Find Doctors</NavLink></li>
        <li><NavLink to="hospitals">Clinics</NavLink></li>
        <li><NavLink to="contacts">Contacts</NavLink></li>

    </>


    // when you wanna show the alert

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, LogOut"
        }).then((result) => {
            if (result.isConfirmed) {
                signOut(auth)
                    .then(result => {


                        console.log(result)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        });

    }



    return (
        // <section>
        <div className="navbar bg-base-100 shadow-sm w-full">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>

            <div className='navbar-end'>

                {
                    user ?

                        <div className='relative'>
                            <img
                                onClick={() => setDropdown(!dropDown)}
                                className='h-10 w-10 rounded-full shadow object-cover cursor-pointer'
                                src={user.photoURL || ""} alt="User" />
                                {
                                    dropDown && (
                                        <div className='absolute right-0 mt-2 w-48 bg-base-100 border border-gray-200 rounded-box shadow-lg z-50'>
                                            <div className='p-4 border-b border-gray-200'>
                                                <div className='flex items-center gap-3'>
                                                    <img
                                                        className='h-12 w-12 rounded-full object-cover'
                                                        src={user.photoURL || ""} alt="User" />
                                                    <div className='flex-1'>
                                                        <p className='font-semibold text-sm'>{user.displayName || "User"}</p>
                                                        <p className='text-xs text-gray-500'>{user.email}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className='menu'>
                                                <li><Link to="/dashboard">Dashboard</Link></li>
                                                <li><a onClick={handleLogout}>Logout</a></li>
                                            </ul>
                                        </div>
                                    )
                                }
                        </div>
                        :

                        <div className="flex gap-2">
                            <Link to="/login"><button className='btn bg-base-200'>Login</button></Link>
                            <Link to="/register"><button className='btn bg-red-600 text-white'>Register</button></Link>
                        </div>

                }
            </div>
        </div>
        // </section >
    );
};

export default Header;