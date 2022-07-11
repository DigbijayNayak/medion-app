import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
} from "@ionic/react";
import { logoUsd } from "ionicons/icons";
import { orthopaedics } from "../../data";

const Orthopedics = () => {
  return (
    <>
      <IonPage>
        <IonContent>
          <IonGrid>
            <IonRow className="ion-padding">
              <IonCol>Orthopedics</IonCol>
            </IonRow>

            <IonRow>
              {orthopaedics.map((data) => {
                return (
                  <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                    <IonCard className="ion-padding ion-text-center">
                      <IonImg src={data.image}></IonImg>
                      <IonText style={{ fontWeight: "bold" }}>
                        <IonIcon icon={logoUsd}></IonIcon>
                        {data.price}
                      </IonText>
                    </IonCard>
                  </IonCol>
                );
              })}
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Orthopedics;
