import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";
import "./Profile.css";

import { auth } from "../firebase";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { personCircle } from "ionicons/icons";

const ProfilePage: React.FC = () => {

  const [loading, dismissloading] = useIonLoading();
  const router = useIonRouter();

  const logout = async () => {
    loading({
      message: 'Loading...',
      duration: 3000,
      spinner: "lines-sharp",
      mode: "md",
    })
    await signOut(auth)
      .then(() => {
        dismissloading();
        router.push("/login");
        console.log("The User Logged Out");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol>
              <IonIcon icon={personCircle} style={{ fontSize: "100px" }} />
            </IonCol>
          </IonRow>
        </IonGrid>

        <IonButton style={{}} onClick={() => logout()} className="ion-padding">
          Logout
        </IonButton>
        {/* <ExploreContainer name="Tab 3 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
