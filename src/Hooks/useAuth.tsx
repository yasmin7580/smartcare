import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const useAuth = () => {
    const auth = useContext(AuthContext)
    if (!auth) {
        throw new Error("auth context related problem")
    }
    return auth
};

export default useAuth;