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
import { logoUsd} from "ionicons/icons";
import { ayush } from "../../data";
import { LazyLoadImage } from '@dcasia/react-lazy-load-image-component-improved';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Ayush = () => {
  return (
    <>
      <IonPage>
        <IonContent>
          <IonGrid>
            <IonRow className="ion-padding">
              <IonCol>
                <IonText>Ayush</IonText>
              </IonCol>
            </IonRow>

            <IonRow>
              {ayush.map((data) => {
                return (
                  <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                    <IonCard className="ion-padding ion-text-center" button>
                    <LazyLoadImage src={data.image} effect="blur" delayTime={300} placeholderSrc={process.env.PUBLIC_URL + "/assets/logo.jpg"} width="100px" height="100px" style={{margin: "auto"}} />
                      {/* <IonImg src={data.image}></IonImg> */}
                      {/* <IonText style={{ fontSize: "10px" }}>
                        {data.title}
                      </IonText> */}
                      <IonText style={{ fontWeight: "bold", margin: "auto" }}>
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

export default Ayush;
