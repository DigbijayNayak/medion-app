import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
} from "@ionic/react";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { chevronForward, heartOutline, helpCircleOutline, informationCircleOutline, locationOutline, notificationsOutline, personCircleOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const ProfilePage: React.FC = () => {
  const {uid} = useAuth();

  const [loading, dismissloading] = useIonLoading();
  const [details, setDetails] = useState({
    name: "",
    email: "",
  });
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

  useEffect(() => {
    onSnapshot(doc(db, "users", uid), (doc) => {
      let name: string;
      let email: string;
      if (doc.exists()) {
        console.log(doc.data())
        name = doc.data().name;
        email = doc.data().email;
        setDetails({name, email});
      }
    });
  }, [uid]);
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
        <IonRow className="ion-justify-content-center ion-padding">
            <IonCol>
              <IonAvatar style={{ margin: "auto" }}>
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="prfile"></img>
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel>
                {details.name}
              </IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel>
                {details.email}
              </IonLabel>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="12">
              <IonIcon
                icon={personCircleOutline}
                className="ion-padding-end"
              ></IonIcon>
              <IonText>Account</IonText>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="12">
              <IonIcon
                icon={locationOutline}
                className="ion-padding-end"
              ></IonIcon>
              <IonText>Delivery Address</IonText>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="12">
              <IonIcon
                icon={heartOutline}
                className="ion-padding-end"
              ></IonIcon>
              <IonText>Wishlist</IonText>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="12">
              <IonIcon
                icon={notificationsOutline}
                className="ion-padding-end"
              ></IonIcon>
              <IonText>Notifications</IonText>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol>
              <IonIcon
                icon={helpCircleOutline}
                className="ion-padding-end"
              ></IonIcon>
              <IonText>Help</IonText>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>
          <IonRow className="ion-padding">
            <IonCol>
              <IonIcon
                icon={informationCircleOutline}
                className="ion-padding-end"
              />
              <IonText>About</IonText>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>
          
          <IonButton style={{}} onClick={() => logout()} className="ion-padding">
            Logout
          </IonButton>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
