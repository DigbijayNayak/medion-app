import {
  IonCard,
  IonCol,
  IonGrid,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { covid } from "../../data";

const Covid = () => {
  return (
    <>
      <IonPage>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonText>Covid Essentials</IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            {covid.map((data) => {
              return (
                <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                  <IonCard>
                    <IonImg src={data.image}></IonImg>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
        </IonGrid>
      </IonPage>
    </>
  );
};

export default Covid;
