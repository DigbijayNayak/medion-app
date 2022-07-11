import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { cart, navigate, notifications } from "ionicons/icons";
// import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import { entries } from "../data";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import Ayush from "../components/category/Ayush";

const HomePage: React.FC = () => {
  const router = useIonRouter();

  const handleCategory = (path: any) => {
    router.push(path);
    window.location.reload();
  };
  // const {loggedIn} = useAuth();
  // if(loggedIn == false){
  //   return <Redirect to="/login"/>
  // }
  return (
    <IonPage>
      <IonContent fullscreen className="home">
        <IonGrid>
          <IonRow className="ion-justify-content-between">
            <IonCol size="6" sizeSm="2" sizeMd="2">
              <IonImg
                src="../assets/trademark.jpg"
                className="mark ion-padding-start"
              ></IonImg>
            </IonCol>
            <IonCol size="3" sizeSm="4" sizeMd="2" className="ion-padding">
              <IonIcon
                icon={cart}
                className="homeicon cart ion-float-right"
              ></IonIcon>
              <IonIcon
                icon={notifications}
                className="homeicon note ion-float-right"
              ></IonIcon>
            </IonCol>
          </IonRow>
          {/* 
          <IonRow>
            <IonCol>
              <IonSearchbar></IonSearchbar>
            </IonCol>
          </IonRow> */}
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow
            className="ion-justify-content-between"
            style={{ fontWeight: "bold" }}
          >
            <IonCol size="6" className="ion-padding ">
              <IonText>Shop By Category</IonText>
            </IonCol>
            <IonCol
              size="3"
              sizeSm="0.5"
              sizeMd="2"
              style={{ marginLeft: "30px" }}
            >
              <IonButton
                fill="clear"
                style={{ fontWeight: "bold" }}
                className="ion-float-right"
              >
                <IonText color="danger" className="ion-float-right">
                  View All
                </IonText>
              </IonButton>
            </IonCol>
          </IonRow>
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
                  <IonCard
                    key={data.id}
                    button
                    onClick={() =>
                      handleCategory("/tabs/home/" + data.title.toLowerCase())
                    }
                  >
                    <IonImg src={data.image} className="img"></IonImg>
                    <IonText style={{ fontSize: "10px" }}>{data.title}</IonText>
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

export default HomePage;
