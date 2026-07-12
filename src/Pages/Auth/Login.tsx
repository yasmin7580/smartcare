import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router';
import { auth } from '../../../firebase.init';
import { useState } from 'react';

const firebaseLoginErrorCodes: Record<string, string> = {
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Check your internet connection.",
    "auth/internal-error": "Something went wrong. Please try again.",
    "auth/operation-not-allowed": "Email/password sign-in is not available.",
    "auth/invalid-api-key": "Configuration error.",
    "auth/app-deleted": "Application error.",
    "auth/app-not-authorized": "Application is not authorized.",
    "auth/user-token-expired": "Your session has expired. Please sign in again.",
    "auth/requires-recent-login": "Please sign in again.",
    "auth/invalid-user-token": "Please sign in again.",
    "auth/web-storage-unsupported": "Your browser is not supported.",
    "auth/popup-blocked": "Please allow popups and try again.",
    "auth/popup-closed-by-user": "Sign-in was cancelled.",
    "auth/cancelled-popup-request": "Another sign-in is already in progress.",
    "auth/timeout": "Request timed out. Please try again.",
    "auth/quota-exceeded": "Service is temporarily unavailable.",
}

const Login = () => {
    // need
    // 1. we need to know loading state 
    // 2. kokhon loading start hobe || kokhon loading state ar value true hbe
    // 3. kokhon loading stop hobe || kokhon loading state ar value false hbe == successfully login || error

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)

    const [loginError, setLoginError] = useState<string | null>(null) // keys





    const handleLogin = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true) // loading start hoiche
        setLoginError(null)

        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result)
                setLoading(false)
                navigate("/")
            })
            .catch(err => {
                console.log(err.code)
                setLoginError(err.code)
                setLoading(false)
            })

    }
    // console.log(errCode.key)
    // console.log(errCode[key]) // if key is dynamic



    // show error only if firebase throws an error 
    // if you wanna write anything from js (not html/css)

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded shadow">
                <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block mb-1">Email</label>
                        <input
                            required
                            type="email"
                            name="email"
                            placeholder="you@example.com"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-1">Password</label>
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="w-full border px-3 py-2 rounded"
                        />
                    </div>

                    {loginError && <p className='text-sm text-red-500'>{firebaseLoginErrorCodes[loginError]}</p>}

                    <button type="submit" className="w-full py-2 bg-red-600 text-white rounded cursor-pointer">
                        {
                            loading ?
                                <span className="loading loading-dots loading-lg"></span>
                                : "Login"
                        }
                    </button>
                </form>

                <p className="mt-4 text-center">
                    Don't have any account{' '}
                    <Link to="/register" className="text-red-600 font-medium">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;