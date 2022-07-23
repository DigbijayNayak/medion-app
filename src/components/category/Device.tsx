import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCard,
  IonImg,
  IonIcon,
} from "@ionic/react";
import { logoUsd } from "ionicons/icons";
import { devices } from "../../data";

const Device = () => {
  return (
    <>
      <IonPage>
        <IonContent>
          <IonGrid>
            <IonRow className="ion-padding">
              <IonCol>
                <IonText>Devices</IonText>
              </IonCol>
            </IonRow>

            <IonRow>
              {devices.map((data) => {
                return (
                  <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                    <IonCard className="ion-padding ion-text-center" button>
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

export default Device;
