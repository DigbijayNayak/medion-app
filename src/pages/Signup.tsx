import {
  IonButton,
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
import React, { useState } from "react";
import "./Signup.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../auth";
import { Redirect } from "react-router";

const SignupPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [status, setStatus] = useState(false);

  const handleRegister = async () => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // const user = userCredential.user;
        console.log("credential: ", userCredential);
      })
      .catch((error) => {
        setStatus(true);
        console.log("error:", error.message);
      });
  };

  if (loggedIn) {
    return <Redirect to="/tabs/home" />;
  }

  return (
    <IonPage>
      <IonContent fullscreen className="signup">
        <IonGrid className="ion-padding" style={{ marginTop: "10px" }}>
          <IonRow>
            <IonImg src="../assets/logo.jpg" className="logo" />
          </IonRow>

          <IonRow>
            <IonCol
              style={{
                color: "#002482",
                fontWeight: "bold",
              }}
              className="ion-text-center"
            >
              Welcome back to MediON
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol style={{ fontSize: "12px" }} className="ion-text-center">
              Let's make your account
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol size="12" sizeSm="4">
              {status && <IonText color="danger">Registration Failed</IonText>}
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="text"
                placeholder="Enter Full Name"
                className="input"
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="email"
                placeholder="Enter Email ID"
                className="input"
                value={email}
                onIonChange={(event) => setEmail(event.detail.value)}
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
                onIonChange={(event) => setPassword(event.detail.value)}
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="password"
                placeholder="Confirm Password"
                className="input"
              ></IonInput>
            </IonCol>
          </IonRow>

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonButton
                type="submit"
                expand="block"
                className="submit"
                onClick={handleRegister}
              >
                Sign Up
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
                <IonText>Already have an account ? </IonText>
                <IonRouterLink
                  routerLink="/login"
                  style={{ color: "#002482", fontWeight: "bold" }}
                >
                  Log in
                </IonRouterLink>
              </div>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
