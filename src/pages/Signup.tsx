import {
  IonButton,
  IonButtons,
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
import "./Signup.css";

const SignupPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader style={{ marginBottom: "5px" }}>
        <IonToolbar color="primary">
          <IonButtons slot="start"></IonButtons>
          <IonTitle>Signup Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Signup Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <form id="view">
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
              Sign up
            </IonButton>
          </IonList>
        </form>
        <div id="text">
          <a href="/login">Already have account?</a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
