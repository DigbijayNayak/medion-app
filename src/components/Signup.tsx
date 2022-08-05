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
  useIonAlert,
  useIonLoading,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import {
  alertCircle,
  logoApple,
  logoFacebook,
  logoGoogle,
} from "ionicons/icons";
import React, { useState } from "react";
import "./Signup.css";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import emailjs from "@emailjs/browser";
import { doc, setDoc } from "firebase/firestore";
const SignupPage: React.FC = () => {
  const router = useIonRouter();
  const [name, setName] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [number, SetNumber] = useState<any>("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [loading, dismissloading] = useIonLoading();

  const textmessage = "Welcome to MediON Bussiness."
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
  const templateParams = {
    name: name,
    email: email,
    message: "You are ready to use the application.",
  };
  const sendEmail = () => {
    emailjs
      .send(
        "service_0gadp33",
        "template_edt8upn",
        templateParams,
        "K5iUbyUdc-tDDB2Ze"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };

  const sendText = () => {
    fetch(`http://localhost:8080/send-text?recipient=${number}&textmessage=${textmessage}`)
    .catch(err => console.log(err))
  }
  const clearInputs = () => {
    setName("");
    setEmail("");
    setPassword("");
    SetNumber("");
  };
  const handleRegister = async () => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    try {
      if (name == null || name === "") {
        const msg = "Name can't be empty.";
        handleToast(msg, "danger");
      } else if (number == null || number === "") {
        const msg = "Phone Number can't be empty.";
        handleToast(msg, "danger");
      } else if (number.length < 10) {
        const msg = "Enter Correct Phone Number.";
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
        number == null ||
        number === ""
      ) {
        const msg = "Password can't be empty";
        handleToast(msg, "danger");
      } else if (password.length < 6) {
        const msg = "Password must be at least 6 characters long";
        handleToast(msg, "danger");
      } else {
        try {
          loading({
            message: "Loading...",
            duration: 3000,
            spinner: "lines-sharp",
            mode: "md",
          });
          await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              console.log(userCredential);
              setDoc(doc(db, "users", userCredential.user.uid), {
                name: name,
                phoneNumber: number,
                email: email,
                uid: userCredential.user.uid,
              });
              clearInputs();
              sendText();
              sendEmail();
              dismissloading();
              handleToast("Registration Successfull.", "success");

              router.push("/login");
              console.log("credential: ", userCredential);
            })
            .catch((error) => {
              clearInputs();
              dismissloading();
              const msg =
                "The Email Address is already in use by another account.";
              console.log("error:", error.message);
              handleAlert(msg);
            });
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      handleAlert(error);
    }
  };

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
                type="text"
                placeholder="Enter Phone Number"
                className="input"
                value={number}
                onIonChange={(event) => SetNumber(event.detail.value)}
              ></IonInput>
            </IonCol>
          </IonRow>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeSm="4">
              <IonInput
                type="text"
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
                  onClick={() => {
                    clearInputs();
                  }}
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
