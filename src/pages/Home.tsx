import {
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { entries } from "./data";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      {/* <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent fullscreen className="home ion-padding">
        {/* <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Home Page</IonTitle>
          </IonToolbar>
        </IonHeader> */}
        <div style={{ display: "flex" }}>
          <IonImg
            src="../assets/trademark.jpg"
            className="mark ion-padding-start"
          ></IonImg>
          <IonIcon icon={notifications} className="homeicon note"></IonIcon>
          <IonIcon icon={cart} className="homeicon cart"></IonIcon>
        </div>
        <IonSearchbar></IonSearchbar>

        <IonCard>
          <IonCardContent>
            <IonGrid>
            {entries.map((data) => {
              return(
                <IonRow key={data.id}>
                  <IonCol className="ion-text-center">
                  <IonImg src={data.image} className="medicine"></IonImg>
                    {data.title}</IonCol>
                </IonRow>
              )
            })}
            </IonGrid>
            
          </IonCardContent>
        </IonCard>

        {/* <ExploreContainer name="Tab 1 page" /> */}
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
