import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';

const instance = axios.create({
    baseURL: "http://localhost:8000"
})
const useAxiosSecure = () => {
    const { user } = useAuth()
    console.log("triggering axiosSecure component")

    useEffect(() => {
        // const requestInterceptor = 
        instance.interceptors.request.use(async (config) => { // api
            console.log("not checking user")
            if (!user) return config
            console.log("after checking user")
            const token = await user.getIdToken(true)
            console.log(token)
            config.headers.Authorization = `Bearer ${token}`
            return config
        })
        // return instance.interceptors.request.eject(requestInterceptor)
    }, [user])


    return instance
};

export default useAxiosSecure;