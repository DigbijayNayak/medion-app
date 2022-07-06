import React, { useContext, useEffect, useState } from 'react';

import { auth as firebaseAuth } from './firebase';

interface Auth{
    loggedIn: boolean;
    userId?: string;
}

// interface AuthInit{
//     loading: boolean;
//     auth?: Auth;
// }

export const AuthContext = React.createContext({loggedIn: false});

export function useAuth() {
    return useContext(AuthContext);
}

export function useAuthInit(){
    const [authState, setAuthState] = useState({loggedIn: false});
    useEffect(() =>{
        return firebaseAuth.onAuthStateChanged((user) =>{
            setAuthState({loggedIn: Boolean(user)});
        })
    }, []);
    return authState;
}