import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
} from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
// import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { entries } from "../data";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen className="home">
        <IonGrid>
          <IonRow className="ion-justify-content-between">
            <IonCol size="6" sizeSm="2" sizeMd="4">
              <IonImg
                src="../assets/trademark.jpg"
                className="mark ion-padding-start"
              ></IonImg>
            </IonCol>
            <IonCol size="3" sizeSm="4" sizeMd="2">
              <IonIcon icon={notifications} className="homeicon note"></IonIcon>
              <IonIcon icon={cart} className="homeicon cart"></IonIcon>
            </IonCol>
          </IonRow>
          {/* 
          <IonRow>
            <IonCol>
              <IonSearchbar></IonSearchbar>
            </IonCol>
          </IonRow> */}
        </IonGrid>

        <IonSearchbar></IonSearchbar>

        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {entries.map((data) => {
                  return (
                    <IonCol
                      key={data.id}
                      className="ion-text-center"
                      size="6"
                      sizeSm="4"
                      sizeMd="3"
                    >
                      <IonCard key={data.id}>
                        <IonImg src={data.image} className="img"></IonImg>
                        <IonText style={{ fontSize: "10px" }}>
                          {data.title}
                        </IonText>
                      </IonCard>
                    </IonCol>
                  );
                })}
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
