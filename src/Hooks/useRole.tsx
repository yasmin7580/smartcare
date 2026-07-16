import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
// import axios from 'axios';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => { // role, roleLoading
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const { data: role, isLoading: roleLoading } = useQuery({ // cache roleadmin@gmail.com = admin // userEmail
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`https://smartcare-server.vercel.app/role?email=${user?.email}`) // { role:'admin'}
            // console.log("result from query",result)
            return result.data.role
        },
        enabled: user ? true : false
    })
    console.log(role)
    return { role, roleLoading }

    // roleuser@gmail.com 
};

export default useRole;