import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonImg,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonPage,
  IonRow,
  IonSearchbar,
  IonText,
  useIonRouter,
  useIonViewWillEnter,
} from "@ionic/react";
import { cart, notifications } from "ionicons/icons";
import "./Home.css";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "@dcasia/react-lazy-load-image-component-improved";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthContext";
const HomePage: React.FC = ({history}:any) => {
  const router = useIonRouter();
  const {total, totalProduct} = useAuth();
  const [datas, setData] = useState<any[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [products, setProducts] = useState([]);

  const pushData = () => {
    const max = datas.length + 8;
    const min = max - 8;
    const newData:any = [];
    if(datas.length < 24){
      for(let i = min; i<max; i++){
        newData.push(products[i]);
      }
      setData([
        ...datas,
        ...newData
      ]);
    }
    else{
      setInfiniteDisabled(true);
    }
  }

  const loadData = (ev:any) => {
    setTimeout(() => {
      pushData();
      ev.target.complete();
      if(datas.length === 8){
        setInfiniteDisabled(datas.length < 8);
      }
    }, 5000);
  }
  useIonViewWillEnter(() => {
    pushData();
  });
  useEffect(()=>{
    getDocs(collection(db, "Select_Category")).then((snapshot) =>{
      const products: any = [];
      snapshot.docs.forEach((docs) =>{
        products.push({...docs.data(), id: docs.id});
      })
      setProducts(products);
    });
    totalProduct();
  }, [])

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
            <IonCol size="3" sizeSm="4" sizeMd="2" className="ion-padding">
              
              <IonText className="count">{total}</IonText>
              <IonIcon icon={cart} className="homeicon cart ion-float-right" onClick={()=>{
                  router.push("/tabs/cart");
                }}></IonIcon>
                <IonIcon icon={notifications} className="homeicon note ion-float-right"></IonIcon>
            </IonCol>
          </IonRow>
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
                <IonText className="ion-float-right" style={{color: "red"}}>
                  View All
                </IonText>
              </IonButton>
            </IonCol>
          </IonRow>


          <IonRow>
            {products.map((data:any) => {
              return (
                <IonCol
                  key={data.id}
                  className="ion-text-center"
                  size="6"
                  sizeSm="4"
                  sizeMd="3"
                >
                  <IonCard key={data.id} className="ion-padding ion-text-center" >
                    <LazyLoadImage src={data.image} effect="blur" delayTime={300} placeholderSrc={process.env.PUBLIC_URL + "/assets/logo.jpg"} width="100px" height="100px" style={{margin: "auto"}} onClick={(e) =>{
                    e.preventDefault();
                    history.push(`/${data.title.toLowerCase()}`)
                  }}/>
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
