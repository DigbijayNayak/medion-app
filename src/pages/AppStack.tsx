import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import { home, search, heart, cart, person } from "ionicons/icons";
import React from "react";
import { Redirect, Route } from "react-router";
import { useAuth } from "../auth";
import Ayush from "../components/category/Ayush";
import Covid from "../components/category/Covid";
import Device from "../components/category/Device";
import Orthopedics from "../components/category/Orthopedics";
import CartPage from "./Cart";
import HomePage from "./Home";
import ProfilePage from "./Profile";
import SearchPage from "./Search";
import WishlistPage from "./Wishlist";
import './AppStack.css';
const AppStack: React.FC = () => {
  const { loggedIn } = useAuth();
  if (loggedIn === false) {
    return <Redirect to="/login" />;
  }
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Redirect path="/tabs" to="/tabs/home" />
        <Route path="/tabs/home" component={HomePage} />
        <Route path="/tabs/search" component={SearchPage} />
        <Route path="/tabs/wishlist" component={WishlistPage} />
        <Route path="/tabs/cart" component={CartPage} />
        <Route path="/tabs/profile" component={ProfilePage} />
        <Route path="/tabs/home/ayush" component={Ayush} />
        <Route path="/tabs/home/covid" component={Covid} />
        <Route path="/tabs/home/devices" component={Device} />
        <Route path="/tabs/home/orthopedics" component={Orthopedics} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className="stack" color="white">
        <IonTabButton tab="home" href="/tabs/home">
          <IonIcon icon={home} />
          <IonLabel style={{ fontSize: "9px" }}>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="search" href="/tabs/search">
          <IonIcon icon={search} />
          <IonLabel style={{ fontSize: "9px" }}>search</IonLabel>
        </IonTabButton>
        <IonTabButton tab="wishlist" href="/tabs/wishlist">
          <IonIcon icon={heart} />
          <IonLabel style={{ fontSize: "9px" }}>Wishlist</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cart" href="/tabs/cart">
          <IonIcon icon={cart} />
          <IonLabel style={{ fontSize: "9px" }}>Cart</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/tabs/profile">
          <IonIcon icon={person} />
          <IonLabel style={{ fontSize: "9px" }}>Profile</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppStack;
