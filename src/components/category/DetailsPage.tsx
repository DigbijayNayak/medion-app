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
import { onAuthStateChanged } from "firebase/auth";
import { deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { alertCircle, arrowBack, heart } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useAuth } from "../../AuthContext";
import { auth, db } from "../../firebase";
const DetailsPage = () => {
  const {totalProduct, totalWishlist} = useAuth();
  const router = useIonRouter();
  const [userId, setUserId] = useState<any>();
  const [status, setStatus] = useState(false);
  const Location = useLocation();

  let data:any = Location.state;
  onAuthStateChanged(auth, (user) =>{
    if(user){
      setUserId(user.uid);
    }
  })
  const { id } = useParams<any>();
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

  const deleteProduct = async (id: any) => {
    await deleteDoc(doc(db, "users", userId, "Favourite_Products", id));
    setStatus(false);
  };
  const addToWishlist = async (id: any, title: any, image: any, price: any) => {
    await setDoc(doc(db, "users", userId, "Favourite_Products", id), {
      title: title,
      image: image,
      price: price,
    });
    setStatus(true);
    totalWishlist();
  };

  const addToCart = async (id: any, title: any, image: any, price: any) => {
    await setDoc(doc(db, "users", userId, "Cart_Products", id), {
      title: title,
      image: image,
      price: price,
    });
  };
  useEffect(() => {
    // const q =  query(collection(db, "Products"),where("category", "==", "BMXlZ9MLxrBtPnjPeA6L"));
    onSnapshot(doc(db, "Products", id), (doc) => {
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
                  router.push(data.pathString);
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
                    // !status? addToWishlist(id, detail.title, detail.image, detail.price):(<></>)
                    status? (deleteProduct(id)): addToWishlist(id, detail.title, detail.image, detail.price)
                    status? handleToast("Product Removed From Your Wishlist", "danger"): handleToast("Product Added To Your Wishlist", "success")
                  }}
                >
                  {
                    status? (<IonIcon
                      icon={heart}
                      color="danger"
                      className="ion-padding-top"
                      style={{ fontSize: "25px" }}
                    />):(<IonIcon
                      icon={heart}
                      color="medium"
                      className="ion-padding-top"
                      style={{ fontSize: "25px" }}
                    />)
                  }
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
                    totalProduct();
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

export default DetailsPage;
