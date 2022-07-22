import { Redirect, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  IonApp,
  IonPage,
  IonRouterOutlet,
  isPlatform,
  setupIonicReact,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

import "./theme/variables.css";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import ResetPasswordPage from "./components/ResetPassword";
import AppStack from "./pages/AppStack";
import { AuthContext } from "./auth";
import { auth, db } from "./firebase";
import { App as app } from "@capacitor/app";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { Browser } from "@capacitor/browser";
import { useEffect, useState } from "react";
import Ayush from "./components/category/Ayush";
import Covid from "./components/category/Covid";
import Device from "./components/category/Device";
import Orthopedics from "./components/category/Orthopedics";
setupIonicReact();

const App: React.FC = () => {
  const [update, setUpdate] = useState<any>({});
  const [appVersion, setAppVersion] = useState<any>("");
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const handleToast = (msg: any) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: "success",
      mode: "md",
    });
  };

  const handleAlert = (msg: any, title: any, btn: any, appVersion: any) => {
    presentAlert({
      header: title,
      subHeader: `Version: ${appVersion}`,
      message: msg,
      buttons: [
        {
          text: btn,
          role: "Download",
          handler: async () => {
            handleToast("Download Clicked");
            await Browser.open({
              url: "https://play.google.com/store/apps/details?id=com.medionptg.app",
            });
          },
        },
      ],
    });
  };

  const getAppInfo = async () => {
    let info = await app.getInfo();
    return info;
  };

  const getConfigData = async () => {
    const updateRef = doc(db, "medion-app-config", "qvfcOEk0qbit4oD78Z40");
    const docSnap = await getDoc(updateRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("Document data: ", docSnap.data());
      setUpdate(data.updateMsg);
      setAppVersion(data.current_version);
    } else {
      console.log("No such document!");
    }
  };

  const checkUpdate = async () => {
    try {
      if (isPlatform("android")) {
        const currentAppInfo = getAppInfo();
        if (appVersion > (await currentAppInfo).version) {
          const msg = update.msg;
          const title = update.title;
          const btn = update.btn;
          handleAlert(msg, title, btn, appVersion);
        }
      } else {
        const msg = "App is not running on android platform";
        console.log(msg);
      }
    } catch (error) {
      // console.log(error);
    }
  };

  const [authState, setAuthState] = useState({
    loggedIn: false,
  });
  useEffect(() => {
    getConfigData();
    if (isPlatform("capacitor")) {
      getAppInfo();
    }
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setAuthState({ loggedIn: Boolean(user) });
    });
  }, []);

  checkUpdate();
  console.log(`rendering App with authState:`, authState);

  return (
    <Router>
      <IonApp>
        <AuthContext.Provider value={{ loggedIn: authState.loggedIn }}>
          <IonReactRouter>
            <IonPage>
              <IonRouterOutlet>
                <Route path="/login" component={LoginPage} exact={true} />
                <Route path="/signup" component={SignupPage} exact={true} />
                <Route
                  path="/reset-password"
                  component={ResetPasswordPage}
                  exact={true}
                />
                <Route path="/tabs/home/ayush" component={Ayush} exact={true} />
                <Route path="/tabs/home/covid" component={Covid} exact={true} />
                <Route
                  path="/tabs/home/devices"
                  component={Device}
                  exact={true}
                />
                <Route
                  path="/tabs/home/orthopedics"
                  component={Orthopedics}
                  exact={true}
                />
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/signup" />}
                />
              </IonRouterOutlet>
              <Route path="/tabs" component={AppStack} />
            </IonPage>
          </IonReactRouter>
        </AuthContext.Provider>
      </IonApp>
    </Router>
  );
};

export default App;
