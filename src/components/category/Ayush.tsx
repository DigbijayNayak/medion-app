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
} from "@ionic/react";
import { arrowBack, cart, cartOutline,heartOutline, logoUsd} from "ionicons/icons";
import { LazyLoadImage } from '@dcasia/react-lazy-load-image-component-improved';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useState } from "react";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router";

const Ayush = ({history}:any) => {
  const {id} = useParams<any>();
  const [products, setProducts] = useState([]);
  const productRef = collection(db, "Ayush_Products");
  const addProduct = async(id:any, title: any, image: any, price: any) =>{
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
  const handleProduct = (path:any) => {
    history.push(path)
  }
  useEffect(()=>{
    let unmounted = false;
    getDocs(productRef).then((snapshot) =>{
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
                {/* <IonText>Ayush</IonText> */}
              </IonCol>
              <IonCol>
                <IonIcon icon={cart} style={{fontSize: "25px"}} className="ion-float-right"></IonIcon>
                <IonIcon icon={heartOutline} style={{fontSize: "25px"}} className="ion-float-right"></IonIcon>
              </IonCol>
            </IonRow>

            <IonRow>
              {products.map((data:any) => {
                return (
                  <IonCol key={data.id} size="6" sizeSm="4" sizeMd="3">
                    <IonCard className="ion-padding ion-text-center" >
                    {/* button onClick={(e) => {
                      e.preventDefault();
                      handleProduct(`/${data.id}`)
                      // history.push("/ayush/"+ data.id.toString())
                    }} */}
                    <LazyLoadImage src={data.image} effect="blur" delayTime={300} placeholderSrc={process.env.PUBLIC_URL + "/assets/logo.jpg"} width="100px" height="100px" style={{margin: "auto"}} />
                      {/* <IonImg src={data.image}></IonImg> */}
                      {/* <IonText style={{ fontSize: "10px" }}>
                        {data.title}
                      </IonText> */}
                      <IonText color="dark" style={{fontSize: "12px"}}>{data.title}</IonText>
                      <br/>
                      <IonText style={{ fontWeight: "bold", margin: "auto" }}>
                        Best Price
                        <IonIcon icon={logoUsd}></IonIcon>
                        {data.price}
                      </IonText><br />
                      <IonButton fill="clear" onClick={(e) =>{
                        e.preventDefault();
                        addProduct(data.id, data.title, data.image,  data.price)
                      }} color="danger">
                        <IonIcon icon={heartOutline} style={{fontSize: "20px"}}></IonIcon>
                      </IonButton>
                      
                      <IonButton fill="clear" onClick={(e) =>{
                        e.preventDefault();
                        addToCart(data.id, data.title, data.image, data.price);
                      }}> <IonIcon icon={cartOutline} style={{fontSize: "20px"}}/></IonButton>
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
