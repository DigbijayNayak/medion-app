import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useState} from 'react';
import { auth } from './firebase';
const AuthContext = React.createContext({loggedIn: false, uid: "", login: () =>{}});
export const AuthContextProvider = ({children}:any) =>{
    const [authState, setAuthState] = useState({
        loading: true,
        loggedIn: false,
      });
      const [userId, setUserId] = useState<any>();
      const Login = () =>{
            onAuthStateChanged(auth, (user) => {
            if(user){
                setUserId(user.uid);
                console.log(user.uid)
                setAuthState({ loading: false, loggedIn: Boolean(user) })
            }
            });
      }
    return(
        <AuthContext.Provider value={
            {
                loggedIn: authState.loggedIn,
                uid: userId,
                login: Login,
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}
