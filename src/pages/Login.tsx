import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const LoginPage: React.FC = ({ history }: any) => {
  const goTo = (path: string) => {
    history.push(path);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Login Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <form onSubmit={(e) => goTo("/tabs/home")}>
          <IonList>
            <IonItem
              style={{
                border: "1px solid black",
                marginBottom: "5px",
                margin: "auto",
                width: "300px",
              }}
            >
              <IonLabel>Email</IonLabel>
              <IonInput type="email"></IonInput>
            </IonItem>

            <IonItem className="pass" id="pas">
              <IonLabel>Password</IonLabel>
              <IonInput type="password"></IonInput>
            </IonItem>
            <IonButton type="submit" style={{ marginLeft: "150px" }}>
              Log in
            </IonButton>
          </IonList>
        </form>
        <div style={{ display: "flex", marginLeft: "60px" }}>
          <a href="/signup">Create an account?</a>
          &nbsp;&nbsp;
          <a href="/reset-password">Forgot Password</a>
        </div>
        {/* <ExploreContainer name="Tab 3 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
