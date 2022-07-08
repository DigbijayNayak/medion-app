import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import { entries } from "../data";

const SearchPage: React.FC = () => {
  return (
    <IonPage className="ion-padding-top">
      <IonContent fullscreen className="ion-padding-top">
        <IonGrid className="ion-padding">
          <IonRow>
            <IonSearchbar></IonSearchbar>
          </IonRow>
          <IonRow>
            {entries.map((data) => {
              return (
                <IonCol key={data.id}>
                  <IonCard key={data.id} className="ion-padding" button>
                    <IonText className="ion-padding">{data.title}</IonText>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SearchPage;
