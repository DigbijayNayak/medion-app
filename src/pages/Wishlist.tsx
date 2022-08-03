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
  useIonAlert,
} from "@ionic/react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
const WishlistPage: React.FC = () => {
  const [products, setProducts] = useState<any>([]);
  const { uid } = useAuth();
  const [presentAlert] = useIonAlert();
  const deleteProduct = async (id: any) => {
    await deleteDoc(doc(db, "users", uid, "Favourite_Products", id));
  };
  useEffect(() => {
    onSnapshot(
      collection(db, "users", uid, "Favourite_Products"),
      (snapshot) => {
        let products: any = [];
        snapshot.docs.forEach((docs) => {
          products.push({ ...docs.data(), id: docs.id });
        });
        setProducts(products);
      }
    );
  }, [uid]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Wishlist Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Wishlist Page</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonGrid>
          {products.map((data: any) => {
            return (
              <IonCard key={data.id} className="ion-padding ion-text-center">
                <IonRow>
                  <IonCol key={data.id}>
                    <IonImg src={data.image}></IonImg>
                  </IonCol>
                  <IonCol size="6">
                    <IonText style={{fontWeight: "bold", fontSize:"12px"}} color="dark">{data.title}</IonText> <br />
                    <IonText color="dark">₹{data.price}</IonText>
                  </IonCol>
                  <IonCol>
                    <IonButton
                      fill="clear"
                      className="ion-float-right"
                      onClick={(e) => {
                        e.preventDefault();
                        presentAlert({
                          header: "Are You Sure! Do you want to delete?",
                          buttons: [
                            {
                              text: "Cancel",
                              role: "cancel",
                            },
                            {
                              text: "OK",
                              role: "confirm",
                              handler: () => {
                                deleteProduct(data.id);
                              },
                            },
                          ],
                        });
                      }}
                    >
                      <IonIcon icon={trashOutline}></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonCard>
            );
          })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WishlistPage;
