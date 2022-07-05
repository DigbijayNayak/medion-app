import {
  IonButton,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
} from "@ionic/react";
import { logoApple, logoFacebook, logoGoogle } from "ionicons/icons";
import { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const LoginPage: React.FC = ({ history }: any) => {
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");

  const handleLogin = async () => {
    await signInWithEmailAndPassword(auth, email, password).then((userCredential) =>{
      console.log(userCredential);
    }).catch((error) =>{
      console.log(error.message)
    })
  }
  // const goTo = (path: string) => {
  //   history.push(path);
  // };

  return (
    <IonPage>
      <IonContent fullscreen className="login">
        <IonGrid className="ion-padding" style={{marginTop: "20px"}}>
          <IonRow>
            <IonImg src="../assets/logo.jpg" className="logo" />
          </IonRow>

          <IonRow>
            <IonCol
              style={{ color: "#002482", fontWeight: "bold" }}
              className="ion-text-center"
            >
              Welcome back to MediON
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol
              style={{ fontSize: "12px"}}
              className="ion-text-center"
            >
              Sign in to continue
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="email"
                placeholder="Enter Email"
                className="input"
                value={email}
                onIonChange = {(event) => setEmail(event.detail.value)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="password"
                placeholder="Enter Password"
                className="input"
                value={password}
                onIonChange = {(event) => setPassword(event.detail.value)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-jusify-centent-end">
            <IonCol size="12" sizeSm="4" sizeMd="8">
              <IonRouterLink
                className="forgot"
                style={{
                  fontSize: "12px",
                  color: "#002482",
                  fontWeight: "bold",
                }}
                routerLink="/reset-password"
              >
                Forgot Password ?
              </IonRouterLink>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4" sizeMd="4">
              <div>
                <IonCheckbox slot="start" />
                <IonText
                  style={{
                    fontSize: "12px",
                    marginLeft: "10px",
                    marginBottom: "10px",
                    // fontWeight: "bold"
                  }}
                >
                  Remember Me
                </IonText>
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonButton
                type="submit"
                expand="block"
                className="submit"
                routerLink="/tabs/home"
                onClick={handleLogin}
              >
                Log in
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow className="ion-text-center ion-justify-content-center">
            <IonCol size="5" sizeSm="5" sizeMd="1.6">
              <hr color="black" style={{ width: "90%" }} />
            </IonCol>
            <IonCol size="2" sizeMd="1">
              <IonText>or</IonText>
            </IonCol>
            <IonCol size="5" sizeSm="5" sizeMd="1.6">
              <hr color="black" style={{ width: "90%" }} />
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <div className="ion-text-center">
                <IonText style={{ fontWeight: "bold" }}>Login Using</IonText>
                <br />
                <div className="icon ion-padding">
                  <IonIcon
                    icon={logoApple}
                    color="black"
                    className="ion-padding-end"
                  />
                  <IonIcon
                    icon={logoFacebook}
                    className="facebook ion-padding-end"
                  />
                  <IonIcon icon={logoGoogle} />
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <div className="ion-padding ion-text-center switch">
                <IonText>Don't have an account ? </IonText>
                <IonRouterLink
                  routerLink="/signup"
                  style={{ color: "#002482", fontWeight: "bold" }}
                >
                  Register
                </IonRouterLink>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
