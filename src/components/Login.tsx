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
  isPlatform,
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
import { useState } from "react";
import "./Login.css";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../auth";
import {GoogleAuth} from "@codetrix-studio/capacitor-google-auth";

const LoginPage: React.FC = () => {
  const { loggedIn } = useAuth();
  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const [present] = useIonToast();
  const [presentAlert] = useIonAlert();
  const [loading, dismissloading] = useIonLoading();
  const router = useIonRouter();
  

  const googleLogin = () => {
    if(isPlatform("android")){
      signInGoogle();
    }else{
      signInWithGoogle();
    }
  }
  const signInGoogle = async () => {
      GoogleAuth.initialize();
      const result = await GoogleAuth.signIn();
      console.log(result);
      if (result) {
        router.push("/tabs/home");
        console.log(result);
      }
  }
  


  const clearInputs = () => {
    setEmail("");
    setPassword("");
  }
  const handleAlert = (msg: any) => {
    presentAlert({
      header: "Alert",
      message: msg,
      buttons: ["OK"],
      backdropDismiss: true,
      translucent: true,
      animated: true,
      cssClass: "login",
    });
  };

  const handleToast = (msg: any, theme: any) => {
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

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((res) => {
        router.push("/tabs/home");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = async () => {
    var atposition = email.indexOf("@");
    var dotposition = email.lastIndexOf(".");
    try {
      if (email == null || email === "") {
        const msg = "Please enter your email.";
        handleToast(msg, "danger");
      } else if (
        atposition < 1 ||
        dotposition < atposition + 2 ||
        dotposition + 2 >= email.length
      ) {
        const msg = "Please enter a valid email address";
        handleToast(msg, "danger");
      } else if (password == null || password === "") {
        const msg = "Please enter your password.";
        handleToast(msg, "danger");
      } else {
        try {
          loading({
            message: 'Loading...',
            duration: 3000,
            spinner: "lines-sharp",
            mode: "md",
          })
          await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              clearInputs();
              console.log(userCredential);           
              router.push("/tabs/home");
              dismissloading();
              handleToast("Login Successfully.", 'success');
            })
            .catch((error) => {
              clearInputs();
              dismissloading();
              handleAlert("User Not Found. Please Register.");
              console.log(error.message);
            });
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // if (loggedIn) {
  //   return <Redirect to="/tabs/home" />;
  // }


  return (
    <IonPage>
      <IonContent fullscreen className="login">
        <IonGrid className="ion-padding" style={{ marginTop: "50px" }}>
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
            <IonCol style={{ fontSize: "12px", color: "black"}} className="ion-text-center">
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
                expand="block"
                className="btn"
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

          <IonRow style={{ marginTop: "20px" }}>
            <IonCol>
              <div className="ion-text-center">
                <IonText style={{ fontWeight: "bold" }}>Login Using</IonText>
                <br />
                <div className="icon ion-padding-top">
                  <IonButton fill="clear">
                    <IonIcon
                      icon={logoApple}
                      className="apple"
                      onClick={(event) => {}}
                    />
                  </IonButton>
                  <IonButton fill="clear" onClick={() => signInWithFacebook()}>
                    <IonIcon icon={logoFacebook} className="facebook" />
                  </IonButton>
                  <IonButton fill="clear" onClick={() => googleLogin()}>
                    <IonIcon
                      icon={logoGoogle}
                      className="google"
                    />
                  </IonButton>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <div className="ion-text-center switch ion-padding">
                <IonText style={{color: "black"}}>Don't have an account ? </IonText>
                <IonRouterLink
                  routerLink="/signup"
                  style={{ color: "#002482", fontWeight: "bold" }}
                  onClick={() => {clearInputs()}}
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
