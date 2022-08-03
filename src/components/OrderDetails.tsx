import {
  IonPage,
  IonContent,
  IonCol,
  IonGrid,
  IonImg,
  IonRow,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
} from "@ionic/react";
import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";

const OrderDetails = () => {
  const { uid } = useAuth();
  const { id } = useParams<any>();
  const [detail, setDetails] = useState({
    title: "",
    image: "",
    price: 1,
  });

  useEffect(() => {
    // const q =  query(collection(db, "Products"),where("category", "==", "BMXlZ9MLxrBtPnjPeA6L"));
    onSnapshot(doc(db, "users", uid, "Order_Lists", id), (doc) => {
      let image: string;
      let price: number;
      let title: string;
      if (doc.exists()) {
        title = doc.data().title;
        image = doc.data().image;
        price = doc.data().price;
        setDetails({ title: title, image: image, price: price });
      }
    });
  }, [id]);
  console.log(detail);
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
          <IonBackButton className="ion-float-left"/>
            <IonTitle>Order Details</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonGrid>
            <IonRow className="ion-padding-center ion-text-center">
              <IonCol>
                <IonImg src={detail.image}></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="ion-text-center">{detail.title}</IonCol>
            </IonRow>

            <IonRow>
              <IonCol className="ion-text-center">{detail.price}</IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default OrderDetails;
