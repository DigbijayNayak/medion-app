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
import {
  briefcaseOutline,
  chevronForward,
  heartOutline,
  helpCircleOutline,
  informationCircleOutline,
  locationOutline,
  notificationsOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useAuth } from "../AuthContext";

const ProfilePage: React.FC = () => {
  const { uid } = useAuth();

  const [loading, dismissloading] = useIonLoading();
  const [details, setDetails] = useState({
    name: "",
    email: "",
  });
  const router = useIonRouter();
  const logout = async () => {
    loading({
      message: "Loading...",
      duration: 3000,
      spinner: "lines-sharp",
      mode: "md",
    });
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
        console.log(doc.data());
        name = doc.data().name;
        email = doc.data().email;
        setDetails({ name, email });
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
                <img
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="prfile"
                ></img>
              </IonAvatar>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel>{details.name}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="ion-text-center">
              <IonLabel>{details.email}</IonLabel>
            </IonCol>
          </IonRow>

          <IonRow
            className="ion-padding ion-justify-content-center"
            style={{ marginTop: "10px" }}
          >
            <IonCol size="2">
              <IonIcon
                icon={personCircleOutline}
                className="ion-margin-start"
              ></IonIcon>
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">Account</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="2">
              <IonIcon
                icon={locationOutline}
                className="ion-margin-start"
              ></IonIcon>
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">Delivery Address</IonText>
            </IonCol>
            <IonCol size="2">
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding" onClick={() => {
            router.push('/myorder')
          }}>
            <IonCol size="2">
              <IonIcon icon={briefcaseOutline} className="ion-margin-start"></IonIcon>
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">My Orders</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={chevronForward}/>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="2">
              <IonIcon
                icon={heartOutline}
                className="ion-margin-start"
              ></IonIcon>
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">Wishlist</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="2">
              <IonIcon
                icon={notificationsOutline}
                className="ion-margin-start"
              ></IonIcon>
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">Notifications</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="2">
              <IonIcon
                icon={helpCircleOutline}
                className="ion-margin-start"
              ></IonIcon>
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">Help</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding">
            <IonCol size="2">
              <IonIcon
                icon={informationCircleOutline}
                className="ion-margin-start"
              />
            </IonCol>
            <IonCol size="8">
              <IonText className="ion-margin-start">About</IonText>
            </IonCol>
            <IonCol>
              <IonIcon icon={chevronForward} />
            </IonCol>
          </IonRow>
          {/* <IonRow>
            <IonButton
            expand="block"
              style={{ margin: "auto" }}
              onClick={() => logout()}
              className="ion-padding"
            >
              Logout
            </IonButton>
          </IonRow> */}
          <IonRow className="ion-padding-bottom">
            <IonCol>
            <IonButton
            expand="block"
              style={{ margin: "auto" }}
              onClick={() => logout()}
              className="ion-padding"
            >
              Logout
            </IonButton>
            </IonCol>
          
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
