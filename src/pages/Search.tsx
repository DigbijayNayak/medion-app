import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const SearchPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="white">
          <IonTitle style={{color: "black"}}>Search Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search Page</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
