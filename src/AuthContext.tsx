import { onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useContext, useState} from 'react';
import { auth, db } from './firebase';
const AuthContext = React.createContext({loggedIn: false, uid: "", login: () =>{}, total: 0,totalFavourites: 0, totalProduct: () => {}, totalWishlist: () => {}});
export const AuthContextProvider = ({children}:any) =>{
    const [authState, setAuthState] = useState({
        loading: true,
        loggedIn: false,
      });
      const [products, setProducts] = useState<any>([]);
      const [favourites, setFavourites] = useState<any>([]);
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
      const totalWishlist = () => {
        onSnapshot(collection(db,"users", userId, "Favourite_Products"), (snapshot) =>{
            let favourites: any = [];
            snapshot.docs.forEach((docs) => {
                favourites.push({...docs.data(), id: docs.id});
            });
            setFavourites(favourites)
        })
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
                totalWishlist: totalWishlist,
                totalFavourites: favourites.length,
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
