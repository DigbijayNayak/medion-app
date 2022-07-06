import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Profile.css";

import { auth } from "../firebase";
import { useAuth } from "../auth";
import { Redirect } from "react-router";

const ProfilePage: React.FC = () => {
  const { loggedIn } = useAuth();
  if (loggedIn == false) {
    return <Redirect to="/signup" />;
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
          onClick={() => auth.signOut()}
        >
          Logout
        </IonButton>
        {/* <ExploreContainer name="Tab 3 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
