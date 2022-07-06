import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter,
} from "@ionic/react";
import "./Profile.css";

import { auth } from "../firebase";
import { useAuth} from "../auth";
import { Redirect } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";

const ProfilePage: React.FC = () => {
  const router = useIonRouter();

  const logout = async () =>{
    await signOut(auth).then(() =>{
      router.push("/login");
      console.log("The User Logged Out");
      window.location.reload();
    }).catch((err) =>{
      console.log(err);
    })
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Profile Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton
          style={{ marginLeft: "150px" }}
          onClick={() => logout()}
        >
          Logout
        </IonButton>
        {/* <ExploreContainer name="Tab 3 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
