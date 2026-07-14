import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
// React.ReactNode == any type except obj
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from '../../firebase.init';


const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null)
    const [userLoading, setUserLoading] = useState<boolean>(true)
    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setUserLoading(false)

        })
        return () => unsubscribe()
    }, [])
    const [theme, setTheme] = useState<string>(() => {
        const temp = localStorage.getItem("theme")
        if (temp) return temp
        return "dark"
    })
    const handleTheme = (mode: string) => {
        localStorage.setItem("theme", mode)
        setTheme(mode)

    }
    console.log(user)

    const context = {
        user,
        theme,
        handleTheme,
        userLoading
    }


    return <AuthContext value={context}> {children}</AuthContext >
};

export default AuthProvider;