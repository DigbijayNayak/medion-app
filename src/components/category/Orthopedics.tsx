import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { arrowBack, cart} from "ionicons/icons";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { LazyLoadImage } from "@dcasia/react-lazy-load-image-component-improved";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useAuth } from "../../AuthContext";

const Orthopedics = ({history}:any) => {

  const [products, setProducts] = useState([]);
  const router = useIonRouter();
  const {total} = useAuth();
  useEffect(()=>{
    let unmounted = false;
    const q =  query(collection(db, "Products"),where("category", "==", "xM5KgkzAWvxLtP1teDF3"));
    getDocs(q).then((snapshot) =>{
      const products: any = [];
      snapshot.docs.forEach((docs) =>{
        products.push({...docs.data(), id: docs.id});
      })
      if(!unmounted){
        setProducts(products);
      }
    });
    return () => {
      unmounted = true;
    };
  }, [])
  return (
    <>
      <IonPage>
        <IonContent>
          <IonGrid>

          <IonRow className="ion-padding">
              <IonCol>
                <IonIcon
                  icon={arrowBack}
                  style={{ fontSize: "25px" }}
                  onClick={() => {
                    history.push("/tabs/home");
                  }}
                ></IonIcon>
              </IonCol>
              <IonText style={{fontWeight: "bold", marginTop: "10px"}}>Orthopedic Products</IonText>
              <IonCol>
                <IonIcon
                  icon={cart}
                  color="primary"
                  style={{ fontSize: "25px" }}
                  className="ion-float-right"
                  onClick={() => {
                    router.push("/tabs/cart");
                  }}
                ></IonIcon>
                <IonText className="circle" style={{position: "absolute", top: "-1px", left: "63px", color: "white", fontWeight: "bold", fontSize: "10px", paddingTop: "1px"}}>{total}</IonText>
              </IonCol>
            </IonRow>

            <IonRow>
              {products.map((data: any) => {
                return (
                  <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                    <IonCard
                      className="ion-padding ion-text-center"
                      button
                      onClick={() => {
                        history.push({
                          pathname: `Orthopedics/${data.id}`,
                          state: {pathString: '/orthopedics'}
                        });
                      }}
                    >
                      <LazyLoadImage
                        src={data.image}
                        effect="blur"
                        delayTime={300}
                        placeholderSrc={
                          process.env.PUBLIC_URL + "/assets/logo.jpg"
                        }
                        width="80"
                        height="80px"
                        style={{ margin: "auto" }}
                      /> <br />
                      <IonText color="dark" style={{ fontSize: "12px" }}>
                        {data.title}
                      </IonText>
                      <br />
                      <IonText style={{ fontWeight: "bold", margin: "auto" }}>
                        Best Price ₹{data.price}
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
