import {
    IonButton,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonImg,
  IonPage,
  IonRow,
  IonText,
  IonToolbar,
  useIonRouter,
  useIonToast,
} from "@ionic/react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { alertCircle, arrowBack, heart } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../AuthContext";
import { db } from "../../firebase";

const OrthopedicProductsDetails = () => {
  const { id } = useParams<any>();
  const { uid } = useAuth();
  const router = useIonRouter();
  const [present] = useIonToast();
  const [detail, setDetails] = useState({
    title: "",
    image: "",
    price: 1,
  });
  const handleToast = (msg: any, theme: any) => {
    present({
      message: msg,
      position: "top",
      animated: true,
      duration: 2000,
      color: `${theme}`,
      mode: "md",
      icon: alertCircle,
    });
  };
  const addToWishlist = async (id: any, title: any, image: any, price: any) => {
    await setDoc(doc(db, "users", uid, "Favourite_Products", id), {
      title: title,
      image: image,
      price: price,
    });
  };

  const addToCart = async (id: any, title: any, image: any, price: any) => {
    await setDoc(doc(db, "users", uid, "Cart_Products", id), {
      title: title,
      image: image,
      price: price,
    });
  };
  useEffect(() => {
    onSnapshot(doc(db, "Orthopedic_Products", id), (doc) => {
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
  return (
    <>
      <IonPage>
        <IonContent>
          <IonHeader>
            <IonToolbar>
              <IonButton
                fill="clear"
                onClick={() => {
                  router.push("/orthopedics");
                }}
              >
                <IonIcon icon={arrowBack}></IonIcon>
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonGrid>

          <IonRow>
              <IonCol>
                <IonButton
                  fill="clear"
                  className="ion-float-right"
                  onClick={() => {
                    addToWishlist(id, detail.title, detail.image, detail.price);
                    handleToast("Product Added To Your Wishlist", "success");
                  }}
                >
                  <IonIcon
                    icon={heart}
                    color="danger"
                    className="ion-padding-top"
                    style={{ fontSize: "25px" }}
                  />
                </IonButton>
                <IonImg
                  src={detail.image}
                  style={{ width: "300px", height: "300px" }}
                ></IonImg>
              </IonCol>
            </IonRow>

            <IonRow className="ion-text-center ion-padding-top">
              <IonCol style={{ fontWeight: "bold" }}>
                <IonText className="ion-padding-top">{detail.title}</IonText>
                <br />
                <IonText>₹ {detail.price}</IonText>
              </IonCol>
            </IonRow>
            <IonRow className="ion-padding">
              <IonCol size="6">
                <IonButton
                  expand="full"
                  onClick={() => {
                    addToCart(id, detail.title, detail.image, detail.price);
                    handleToast("Product Added To Your Cart", "success");
                  }}
                >
                  Add To Cart
                </IonButton>
              </IonCol>
              <IonCol size="6" className="ion-text-center">
                <IonButton expand="full" color="danger">
                  Buy Now
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default OrthopedicProductsDetails;
