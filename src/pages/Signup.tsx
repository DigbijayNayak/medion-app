import { IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const SignupPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
        <IonButtons slot="start"></IonButtons>
          <IonTitle>Signup Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Signup Page</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <form>
            <IonList>
                <IonItem>
                    <IonLabel>Email</IonLabel>
                </IonItem>
            </IonList>
        </form>

      </IonContent>
    </IonPage>
  );
};

export default SignupPage;
