import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import axios from 'axios';

const useRole = () => { // role, roleLoading
    const { user } = useAuth()
    const { data: role, isLoading: roleLoading } = useQuery({ // cache roleadmin@gmail.com = admin // userEmail
        queryKey: ["role", user?.email],
        queryFn: async () => {
            const result = await axios.get(`http://localhost:8000/role?email=${user?.email}`) // { role:'admin'}
            // console.log("result from query",result)
            return result.data.role
        },
        enabled: user ? true : false
    })
    return { role, roleLoading }

    // roleuser@gmail.com 
};

export default useRole;