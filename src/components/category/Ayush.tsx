import {
  IonButton,
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
import { arrowBack, cart, heart} from "ionicons/icons";
import { LazyLoadImage } from '@dcasia/react-lazy-load-image-component-improved';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";


const Ayush = ({history}:any) => {
  const [products, setProducts] = useState([]);

  const router = useIonRouter();
  const addToWishlist = async(id:any, title: any, image: any, price: any) =>{
    await setDoc(doc(db, "Favourite_Products", id),{
      title: title,
      image: image,
      price: price,
    });
  }

  const addToCart = async (id:any, title:any, image:any, price:any) =>{
    await setDoc(doc(db, "Cart_Products", id),{
      title: title,
      image: image,
      price: price,
    })
  }
  useEffect(()=>{
    let unmounted = false;
    getDocs(collection(db, "Ayush_Products")).then((snapshot) =>{
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
                <IonIcon icon={arrowBack} style={{fontSize: "25px"}} onClick={() =>{
                  history.push("/tabs/home")
                }}></IonIcon>
              </IonCol>
                <IonText style={{fontWeight: "bold", marginTop: "10px"}}>Ayush Products</IonText>
              <IonCol>
                <IonIcon icon={cart} color="primary" style={{fontSize: "25px"}} className="ion-float-right" onClick={()=>{
                  router.push("/tabs/cart");
                }}></IonIcon>
                <IonIcon icon={heart} style={{fontSize: "25px"}} color="danger" className="ion-float-right" onClick={()=>{
                  router.push("/tabs/wishlist");
                }}></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow>
              {products.map((data:any) => {
                return (
                  <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                    <IonCard className="ion-padding ion-text-center" button onClick={() => {
                      history.push(`ayush/${data.id}`)
                    }}>
                    
                    <LazyLoadImage src={data.image} effect="blur" delayTime={300} placeholderSrc={process.env.PUBLIC_URL + "/assets/logo.jpg"} width="80" height="80px" style={{margin: "auto"}} />
                      <IonText color="dark" style={{fontSize: "12px"}}>{data.title}</IonText>
                      <br/>
                      <IonText style={{ fontWeight: "bold", margin: "auto" }}>
                        Best Price
                        ₹{data.price}
                      </IonText><br />
                      <IonButton fill="clear" onClick={(e) =>{
                        e.preventDefault();
                        addToWishlist(data.id, data.title, data.image,  data.price)
                      }} color="danger">
                        <IonIcon icon={heart} color="danger" style={{fontSize: "20px"}}></IonIcon>
                      </IonButton>
                      
                      <IonButton fill="clear" onClick={(e) =>{
                        e.preventDefault();
                        addToCart(data.id, data.title, data.image, data.price);
                      }}> <IonIcon icon={cart} style={{fontSize: "20px"}}/></IonButton>
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

export default Ayush;
