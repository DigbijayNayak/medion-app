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
// import { entries } from "../data";
import { useEffect, useState } from "react";
import { LazyLoadImage } from "@dcasia/react-lazy-load-image-component-improved";

import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

const HomePage: React.FC = () => {
  const router = useIonRouter();
  const [porducts, setProducts] = useState<any>([]);
  const [datas, setData] = useState<any[]>([]);
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const productRef = collection(db, "Select_Category");
  const handleCategory = (path: any) => {
    router.push(path);
  };

  const pushData = () => {
    const max = datas.length + 8;
    const min = max - 8;
    const newData:any = [];
    if (datas.length < 20) {
      for (let i = min; i < max; i++) {
        newData.push(porducts[i]);
      }
      setData([...datas, ...newData]);
    } else {
      setInfiniteDisabled(true);
    }
  };

  const loadData = (ev: any) => {
    setTimeout(() => {
      pushData();
      ev.target.complete();
      if (datas.length === 8) {
        setInfiniteDisabled(datas.length < 8);
      }
    }, 5000);
  };
  useIonViewWillEnter(() => {
    pushData();
  });

  useEffect(() => {
    getDocs(productRef).then((snapshot) => {
      const products: any = [];
      snapshot.docs.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });
      console.log(products);
      setProducts(products);
    });
  }, []);

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
        </IonGrid>

        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSearchbar></IonSearchbar>
            </IonCol>
          </IonRow>
          <IonRow>
            {porducts.map((data:any) => {
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
                    className="ion-padding ion-text-center"
                    onClick={() =>
                      handleCategory("/tabs/home/" + data.title.toLowerCase())
                    }
                  >
                    <LazyLoadImage
                      src={data.image}
                      effect="blur"
                      delayTime={300}
                      placeholderSrc={
                        process.env.PUBLIC_URL + "/assets/logo.jpg"
                      }
                      width="100px"
                      height="100px"
                      style={{ margin: "auto" }}
                    />
                    <IonText
                      style={{
                        fontSize: "12px",
                        fontWeight: "bold",
                        margin: "auto",
                      }}
                    >
                      {data.title}
                    </IonText>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
          <IonInfiniteScroll
            onIonInfinite={loadData}
            threshold="100px"
            disabled={isInfiniteDisabled}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Loading more data..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
