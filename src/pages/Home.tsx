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
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
import "./Home.css";
import { entries } from "../data";
import { useAuth } from "../auth";
import { Redirect } from "react-router";
import { useState } from "react";
import { LazyLoadImage } from "@dcasia/react-lazy-load-image-component-improved";

const HomePage: React.FC = () => {
  // const {loggedIn} = useAuth();
  // if(loggedIn == false){
  //   return <Redirect to="/login"/>
  // }

  const router = useIonRouter();
  const [datas, setData] = useState<any[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);

  const pushData = () => {
    // const max = datas.length + 8;
    // const min = max - 12;
    const newData = [];
    for(let i = 0; i<12; i++){
      entries[i].id = entries[i].id + i * i;
      newData.push(entries[i]);
    }
    setData([
      ...datas,
      ...newData
    ]);
  }

  const loadData = (ev:any) => {
    console.log(datas.length);
    setTimeout(() => {
      pushData();
      console.log('Loaded data');
      ev.target.complete();
      console.log(datas.length);
      if(datas.length === 12){
        setInfiniteDisabled(datas.length < 12);
      }
    }, 5000);
  }
  useIonViewWillEnter(() => {
    pushData();
  });


  const handleCategory = (path: any) => {
    router.push(path);
    window.location.reload();
  };
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
            {datas.map((data) => {
              return (
                <IonCol
                  key={data.id}
                  className="ion-text-center"
                  size="6"
                  sizeSm="4"
                  sizeMd="3"
                >
                  <IonCard key={data.id} button className="ion-padding ion-text-center" onClick={() =>
                      handleCategory("/tabs/home/" + data.title.toLowerCase())
                    }>
                    {/* <IonImg src={data.image} className="img"></IonImg> */}
                    <LazyLoadImage src={data.image} effect="blur" delayTime={300} placeholderSrc={process.env.PUBLIC_URL + "/assets/logo.jpg"} width="100px" height="100px" style={{margin: "auto"}} />
                    <IonText style={{ fontSize: "12px", fontWeight: "bold", margin: "auto" }}>{data.title}</IonText>
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
