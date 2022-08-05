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
  useIonRouter,
} from "@ionic/react";
import { addDoc, collection, deleteDoc, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { trashOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const CartPage: React.FC = () => {
  const router = useIonRouter();
  const [products, setProducts] = useState<any>([]);
  const { uid } = useAuth();
  const [presentAlert] = useIonAlert();
  const [total, setTotal] = useState<any>();

  const deleteProduct = async (id: any) => {
    await deleteDoc(doc(db, "users", uid, "Cart_Products", id));
  };

  const handleAlert = (msg: any) => {
    presentAlert({
      header: "Alert",
      message: msg,
      buttons: ["OK"],
      backdropDismiss: true,
      translucent: true,
      animated: true,
    });
  };
  const deleteAllProducts =  () => {
    addDoc(collection(db, "users", uid, "Order_Lists"), {
      products,
      timeStamp: Timestamp.fromDate(new Date()),
    });
    onSnapshot(collection(db, "users", uid, "Cart_Products"), (snapshot) => {
      snapshot.docs.forEach((docs) => {
        deleteDoc(doc(db, "users", uid, "Cart_Products", docs.id));
      });

    });
  }
  useEffect(() => {
    onSnapshot(collection(db, "users", uid, "Cart_Products"), (snapshot) => {
      let products: any = [];
      let total = 0;
      snapshot.docs.forEach((docs) => {
        total = total + docs.data().price;
        products.push({ ...docs.data(), id: docs.id });
      });
      setProducts(products);
      setTotal(total);
    });
  }, [uid]);

  const publishableKey =
    "pk_test_51LP6KFSJb2FqEHTGPetWcFLnwjQ1GkwiAo3Qrg7u9IuT4ijGfqL4XqF5psA5HKfMRx1tcD4ep8EINoHT0hzWeTfu00J5OTByZ2";
  const payNow = async (token: any) => {
    try {
      const response = await axios({
        url: "http://localhost:8100/payment",
        method: "post",
        data: {
          amount: total * 100,
          token,
        },
      });
      if (response.status === 200) {
        console.log(response);
        deleteAllProducts();
        router.push("/payment");
        console.log("Your Payment was successful");
      }
    } catch (error) {
      handleAlert("Your Payment Was Successful.");
      console.log(error);
    }
  };
  const priceForStripe = total * 100;
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
            {products.map((data: any) => {
              return (
                <IonCard key={data.id} className="ion-padding ion-text-center">
                <IonRow className="ion-padding">
                  <IonCol>
                      <IonImg src={data.image}></IonImg>
                  </IonCol>
                  <IonCol size="6">
                      <IonText style={{ fontWeight: "bold", color: "black", fontSize: "12px"}}>
                        {data.title}
                      </IonText>
                      <br />
                      <IonText style={{ fontWeight: "bold", color: "black"}}>
                        ₹{data.price}
                      </IonText>
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

          {
          products.length > 0?(
            <>
              <IonRow>
            <IonCol className="ion-padding">
              <IonText>Total Amount: </IonText>
            </IonCol>
            <IonCol className="ion-padding">
              <IonText className="ion-float-right">₹{total}</IonText>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="full"
                onClick={() => {
                  // router.push("/payment");
                }}
              >
                <StripeCheckout
                  stripeKey={publishableKey}
                  label="Check Out"
                  name="Pay with Credit Card"
                  billingAddress
                  shippingAddress
                  amount={priceForStripe}
                  description={`Your total is $${total}`}
                  token={payNow}
                />
              </IonButton>
            </IonCol>
          </IonRow>
            </>
          ):(<></>)
          }
          
          {/* <IonRow>
            <IonCol>
              <IonButton expand="full" onClick={() => {
                onCheckoutClicked();
              }}>Check Out</IonButton>
            </IonCol>
          </IonRow> */}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
