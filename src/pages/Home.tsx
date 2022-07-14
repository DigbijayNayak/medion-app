import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  useIonViewWillEnter,
} from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
import "./Home.css";
import { entries } from "../data";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import { useState } from "react";

const HomePage: React.FC = () => {
  // const {loggedIn} = useAuth();
  // if(loggedIn == false){
  //   return <Redirect to="/login"/>
  // }
  const [datas, setData] = useState<string[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const pushData = () => {
    const max = datas.length + 20;
    const min = max - 20;
    const newData = [];
    for(let i = min; i<max; i++){
      newData.push(entries[i]
        
        );
    }
    setData([
      // ...datas,
      // ...newData
    ]);
  }

  const loadData = (ev:any) => {
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
      if(datas.length === 1000){
        setInfiniteDisabled(true);
      }
    }, 5000);
  }
  useIonViewWillEnter(() => {
    pushData();
  });
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

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar></IonSearchbar>
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
                  <IonCard key={data.id}>
                    <IonImg src={data.image} className="img"></IonImg>
                    <IonText style={{ fontSize: "10px" }}>{data.title}</IonText>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
          <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
            <IonInfiniteScrollContent loadingSpinner="bubbles" loadingText="Loading more data...">

            </IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
