import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useContext, useState} from 'react';
import { auth, db } from './firebase';
const AuthContext = React.createContext({loggedIn: false, uid: "", login: () =>{}, total: 0, totalProduct: () => {}});
export const AuthContextProvider = ({children}:any) =>{
    const [authState, setAuthState] = useState({
        loading: true,
        loggedIn: false,
      });
      const [products, setProducts] = useState<any>([]);
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
    const totalProducts = () =>{
        onSnapshot(collection(db, "users", userId, "Cart_Products"), (snapshot) => {
            let products: any = [];
            snapshot.docs.forEach((docs) => {
              products.push({ ...docs.data(), id: docs.id });
            });
            setProducts(products);
        });
    }
    return(
        <AuthContext.Provider value={
            {
                loggedIn: authState.loggedIn,
                uid: userId,
                login: Login,
                totalProduct: totalProducts,
                total: products.length
            }
        }>
            {children}
        </AuthContext.Provider>
    );
}
export const useAuth = () => {
    return useContext(AuthContext);
}
