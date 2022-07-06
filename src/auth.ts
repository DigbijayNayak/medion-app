import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react';

import { auth as firebaseAuth } from './firebase';

interface Auth{
    loggedIn: boolean;
    userId?: string;
}

interface AuthInit{
    loading: boolean;
    auth?: Auth;
}

export const AuthContext = React.createContext({loggedIn: false});

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthInit(){
    const [authState, setAuthState] = useState({loggedIn: false});
    useEffect(() =>{
        return onAuthStateChanged(firebaseAuth, (user) =>{
            // console.log(user);
            const bool = Boolean(user);
            setAuthState({loggedIn: bool});
            console.log(Boolean(user));
            console.log(authState);
        })
    }, []);
    return authState;
}