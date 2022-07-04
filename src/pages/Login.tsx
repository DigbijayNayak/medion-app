import {
  IonButton,
  IonCheckbox,
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
import "./Login.css";
const LoginPage: React.FC = ({ history }: any) => {
  const goTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="login">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonItem className="logo">
        </IonItem> */}

        <form onSubmit={(e) => goTo("/tabs/home")} className="ion-padding" style={{marginTop: "50px"}}>
          <IonImg src="../assets/logo.jpg" className="logo" />
          <div className="text">
            <IonText style={{color: "#002482", fontWeight: "bold"}}>Welcome back to MediON</IonText>
            <br />
            <IonText style={{ fontSize: "12px" }}>Sign in to continue</IonText>
          </div>
          <IonList>
            <IonItem className="item">
              {/* <IonLabel position="stacked">Email</IonLabel> */}
              <IonInput type="email" placeholder="Enter Email"></IonInput>
            </IonItem>

            <IonItem className="item">
              {/* <IonLabel position="stacked">Password</IonLabel> */}
              <IonInput type="password" placeholder="Enter Password"></IonInput>
            </IonItem>
            <div>
              <IonRouterLink className="forgot" style={{ fontSize: "12px", color:"#002482", fontWeight: "bold" }} routerLink="/reset-password">
                Forgot Password?
              </IonRouterLink>
              <br />
              <IonCheckbox slot="start" />
              <IonText
                style={{
                  fontSize: "16px",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
              >
                Remember Me
              </IonText>
            </div>
            <IonButton type="submit" expand="block" className="submit">
              Log in
            </IonButton>
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
            <IonIcon icon={logoApple} color="black" className="ion-padding-end"/>
            <IonIcon icon={logoFacebook} className="facebook ion-padding-end" />
            <IonIcon icon={logoGoogle} />
          </div>
        </div>

        <div className="ion-padding ion-text-center">
          <IonText>Don't have an account?</IonText>
          <IonRouterLink routerLink="/signup" style={{color:"#002482", fontWeight: "bold"}}>Register</IonRouterLink>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
