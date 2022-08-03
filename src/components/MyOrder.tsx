import {
  IonBackButton,
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
import { collection, onSnapshot } from "firebase/firestore";
import { trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";

const MyOrder: React.FC = ({ history }: any) => {
  const [products, setProducts] = useState([]);
  const { uid } = useAuth();
  useEffect(() => {
    onSnapshot(collection(db, "users", uid, "Order_Lists"), (snapshot) => {
      let products: any = [];
      snapshot.docs.forEach((docs) => {
        // console.log(docs.data());
        products.push({ ...docs.data(), id: docs.id });
      });
      setProducts(products);
    });
  }, [uid]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonBackButton className="ion-float-left" />
          <IonTitle className="ion-padding">My Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
          {products.map((data: any) => {
            return (
              <IonCard>
                <IonRow key={data.id} className="ion-padding ion-text-center">
                  {data.products.map((value: any) => {
                    return (
                      <>
                        {/* <IonCard key={value.id}> */}
                        <IonRow className="ion-padding" key={value.id}>
                          <IonCol>
                            <IonImg
                              src={value.image}
                              onClick={() => {
                                history.push(`/myorder/${value.id}`);
                              }}
                            ></IonImg>
                          </IonCol>
                          <IonCol size="6">
                            <IonText
                              style={{
                                fontWeight: "bold",
                                color: "black",
                                fontSize: "12px",
                              }}
                            >
                              {value.title}
                            </IonText>
                            <br />
                            <IonText
                              style={{ fontWeight: "bold", color: "black" }}
                            >
                              ₹{value.price}
                            </IonText>
                          </IonCol>
                          <IonCol>
                            <IonButton
                              fill="clear"
                              className="ion-float-right"
                              onClick={(e) => {
                                e.preventDefault();
                                // presentAlert({
                                //   header: "Are You Sure! Do you want to delete?",
                                //   buttons: [
                                //     {
                                //       text: "Cancel",
                                //       role: "cancel",
                                //     },
                                //     {
                                //       text: "OK",
                                //       role: "confirm",
                                //       handler: () => {
                                //         deleteProduct(data.id);
                                //       },
                                //     },
                                //   ],
                                // });
                              }}
                            >
                              <IonIcon icon={trashOutline}></IonIcon>
                            </IonButton>
                          </IonCol>
                        </IonRow>
                        {/* </IonCard> */}
                      </>
                    );
                  })}
                  <IonCol>
                    <IonText color="dark">{data.timeStamp.toDate().toString()}</IonText>
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

export default MyOrder;
