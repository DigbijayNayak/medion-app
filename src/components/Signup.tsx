import {
  IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInput,
  IonLoading,
  IonPage,
  IonRouterLink,
  IonRow,
  IonText,
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import {
  alertCircle,
  alertOutline,
  logoApple,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";
import React, { useState } from "react";
import "./Signup.css";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../auth";
import { Redirect } from "react-router";

const SignupPage: React.FC = () => {
  const router = useIonRouter();
  const { loggedIn } = useAuth();
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [compassword, setComPassword] = useState<any>("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [loading, dismissloading] = useIonLoading();
  // const [loading, setloading] = useState(false);
 

  const handleToast = async (msg: any, theme: any) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: `${theme}`,
      mode: "md",
      icon: alertCircle,
    });
  };

  const handleAlert = async (msg: any) => {
    presentAlert({
      header: "Alert",
      message: msg,
      buttons: ["OK"],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "signup",
    });
  };

  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    setComPassword("");
  }
  const handleRegister = async () => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    try {
      if (name == null || name === "") {
        const msg = "Name can't be empty";
        handleToast(msg, "danger");
      } else if (email == null || email === "") {
        const msg = "Email can't be empty";
        handleToast(msg, "danger");
      } else if (
        atposition < 1 ||
        dotposition < atposition + 2 ||
        dotposition + 2 >= email.length
      ) {
        const msg = "Please enter a valid email address";
        handleToast(msg, "danger");
      } else if (
        password == null ||
        password === "" ||
        compassword == null ||
        compassword === ""
      ) {
        const msg = "Password can't be empty";
        handleToast(msg, "danger");
      } else if (password.length < 6) {
        const msg = "Password must be at least 6 characters long";
        handleToast(msg, "danger");
      } else if (password != compassword) {
        const msg = "Wrong Confirm Password";
        handleToast(msg, "danger");
      } else {
        try{
          loading({
            message: 'Loading...',
            duration: 3000,
            spinner: "lines-sharp",
            mode: "md",
            
          })
          // setloading(true);
          await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // const user = userCredential.user;
            // setloading(false);
            dismissloading();
            handleToast("Registration Successfull.", "success");
            router.push("/login");
            console.log("credential: ", userCredential);
            window.location.reload();
          })
          .catch((error) => {
            // setStatus(true);
            // setloading(false);
            clearInputs();
            dismissloading();
            const msg =
              "The Email Address is already in use by another account.";
            console.log("error:", error.message);
            handleAlert(msg);
          });
        }
        catch(error){
          console.log(error)
        } 
      }
    } catch (error) {
      handleAlert(error);
    }
  };
  // if(loading){
  //   return <IonLoading isOpen/>
  // }
  if (loggedIn == true) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonContent fullscreen className="signup">
        <IonGrid className="ion-padding" style={{ marginTop: "50px" }}>
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

          {/* <IonRow className="ion-justify-content-center ion-text-center">
            <IonCol size="12" sizeSm="4">
              {status && <IonText color="danger">Registration Failed</IonText>}
            </IonCol>
          </IonRow> */}

          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="text"
                placeholder="Enter Full Name"
                className="input"
                value={name}
                onIonChange={(event) => setName(event.detail.value)}
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
                value={compassword}
                onIonChange={(event) => setComPassword(event.detail.value)}
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

          <IonRow style={{ marginTop: "20px" }}>
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
              <div className="ion-text-center switch">
                <IonText>Already have an account ? </IonText>
                <IonRouterLink
                  routerLink="/login"
                  style={{ color: "#002482", fontWeight: "bold" }}
                  onClick={() => {clearInputs()}}
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
