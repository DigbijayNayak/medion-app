import { Redirect, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import {
  IonApp,
  IonLoading,
  IonPage,
  IonRouterOutlet,
  setupIonicReact,
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

/* Theme variables */
import "./theme/variables.css";
// import SearchPage from "./pages/Search";
// import WishlistPage from "./pages/Wishlist";
// import ProfliePage from "./pages/Profile";
// import HomePage from "./pages/Home";
// import CartPage from "./pages/Cart";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import ResetPasswordPage from "./components/ResetPassword";
import AppStack from "./pages/AppStack";
import { AuthContext } from "./auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
setupIonicReact();

const App: React.FC = () => {
  // const authState = useAuthInit();
  // const {loggedIn} = useAuth();
  const [authState, setAuthState] = useState({
    loading: true,
    loggedIn: false,
  });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // setLoggedIn(Boolean(user));
      setAuthState({ loading: false, loggedIn: Boolean(user) });
    });
  }, []);
  console.log(`rendering App with authState:`, authState);
  if (authState.loading) {
    return <IonLoading isOpen />;
  }

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
