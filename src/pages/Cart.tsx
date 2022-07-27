import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";

const CartPage: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const {uid} = useAuth();

  const deleteProduct = async (id: any) => {
    await deleteDoc(doc(db, "users", uid, "Cart_Products", id));
  };

  useEffect(() => {
    onSnapshot(collection(db, "users", uid, "Cart_Products"), (snapshot) => {
      let products: any = [];
      snapshot.docs.forEach((docs) => {
        products.push({ ...docs.data(), id: docs.id });
      });
      setProducts(products);
    });
  }, [uid]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Cart Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          <IonRow>
            {products.map((data: any) => {
              return (
                <IonCol key={data.id} size="12">
                  <IonCard
                    key={data.id}
                    className="ion-padding ion-text-center"
                  >
                    <IonImg src={data.image}></IonImg>
                    <IonText style={{fontWeight: "bold", color: "black"}}>{data.title}</IonText><br/>
                    <IonText style={{fontWeight: "bold", color: "black"}}>₹{data.price}</IonText>
                    <IonButton
                      fill="clear"
                      className="ion-float-right"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteProduct(data.id);
                      }}
                    >
                      <IonIcon icon={trashOutline}></IonIcon>
                    </IonButton>
                  </IonCard>
                </IonCol>
              );
            })}
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="full">Check Out</IonButton>
            </IonCol>
          </IonRow>
          
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
