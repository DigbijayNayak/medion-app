import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonInput,

  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoApple, logoFacebook, logoGoogle } from "ionicons/icons";
import "./Signup.css";

const SignupPage: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Register</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="signup">
        <form className="ion-padding" style={{marginTop: "50px"}}>
          <IonImg src="../assets/logo.jpg" className="logo" />
          <div className="text">
            <IonText style={{color: "#002482", fontWeight: "bold"}}>Welcome back to MediON</IonText>
            <br />
            <IonText style={{ fontSize: "12px" }}>
              Let's make your account.{" "}
            </IonText>
          </div>
          <IonList>
            <IonItem className="item">
              {/* <IonLabel position="stacked">Email</IonLabel> */}
              <IonInput type="text" placeholder="Enter Name"></IonInput>
            </IonItem>
            <IonItem className="item">
              {/* <IonLabel position="stacked">Email</IonLabel> */}
              <IonInput type="email" placeholder="Enter Email"></IonInput>
            </IonItem>

            <IonItem className="item">
              {/* <IonLabel position="stacked">Password</IonLabel> */}
              <IonInput type="password" placeholder="Enter Password"></IonInput>
            </IonItem>
            <IonItem className="item">
              {/* <IonLabel position="stacked">Password</IonLabel> */}
              <IonInput type="password" placeholder="Enter Password"></IonInput>
            </IonItem>
            <IonButton expand="block">Sign up</IonButton>

            <div style={{ display: "flex", marginTop: "10px" }}>
              <hr color="black" style={{ width: "50%" }} />
              OR
              <hr color="black" style={{ width: "50%" }} />
            </div>
          </IonList>
        </form>


        <div className="ion-text-center">
          <IonText>Login Using</IonText>
          <br />
          <div className="icon ion-padding">
            <IonIcon
              icon={logoApple}
              color="black"
              className="ion-padding-end"
            />
            <IonIcon icon={logoFacebook} className="facebook ion-padding-end" />
            <IonIcon icon={logoGoogle} />
          </div>
        </div>


        <div className="ion-padding ion-text-center" style={{fontSize: "14px"}}>
          <IonText>Already hava an account?</IonText>
          <IonRouterLink routerLink="/login" style={{color:"#002482", fontWeight: "bold"}}>Log in</IonRouterLink>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
