import {
  IonAvatar,
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import "./Profile.css";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { alertCircle, chevronForward, heartOutline, helpCircleOutline, informationCircleOutline, locationOutline, notificationsOutline, personCircleOutline } from "ionicons/icons";

const ProfilePage: React.FC = () => {

  const [loading, dismissloading] = useIonLoading();
  const [present] = useIonToast();
  const router = useIonRouter();

  const handleToast = (msg: any) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: 'success',
      mode: "md",
      icon: alertCircle,
    });
  };

  const logout = async () => {
    loading({
      message: 'Loading...',
      duration: 3000,
      spinner: "lines-sharp",
      mode: "md",
    })
    await signOut(auth)
      .then(() => {
        handleToast("logout successfully....");
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
        <IonToolbar color="white">
          <IonTitle style={{color: "black"}}>Profile Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="profile">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Profile Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
        <IonRow className="ion-justify-content-center ion-padding">
            <IonCol>
              <IonAvatar className="">
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
              </IonAvatar>
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
