import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonList,
  IonPage,
  IonText,
} from "@ionic/react";
import { star } from "ionicons/icons";

const ResetPasswordPage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <form style={{ marginTop: "50px" }} className="ion-padding">
          <IonImg src="../assets/logo.jpg" className="logo" />
          <div className="text">
            <IonText style={{ color: "#002482", fontWeight: "bold" }}>
              Welcome back to MediON
            </IonText>
            <br />
            <IonText
              className="ion-text-wrap ion-padding-top"
              style={{ fontSize: "12px" }}
            >
              <IonIcon
                icon={star}
                color="danger"
                style={{
                  fontSize: "5px",
                  marginBottom: "7px",
                  marginRight: "4px",
                }}
              />
              We will send you a message to set or reset your new password
            </IonText>
          </div>
          <IonList>
            <IonItem className="item">
              {/* <IonLabel position="stacked">Email</IonLabel> */}
              <IonInput type="email" placeholder="Enter Email / Phone Number"></IonInput>
            </IonItem>

            <IonButton expand="block">Send Verification</IonButton>
          </IonList>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default ResetPasswordPage;
