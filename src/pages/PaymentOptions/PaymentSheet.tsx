import {
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  useIonRouter,
} from "@ionic/react";
import { arrowBack, checkmarkOutline } from "ionicons/icons";
import React from "react";

// import {Stripe} from '@ionic-native/stripe';
// import { Stripe } from '@awesome-cordova-plugins/stripe/';
const PaymentSheet: React.FC = () => {
  const router = useIonRouter();
  // const payWithStripe = () =>{
  //   Stripe.setPublishableKey("pk_test_51LP6KFSJb2FqEHTGPetWcFLnwjQ1GkwiAo3Qrg7u9IuT4ijGfqL4XqF5psA5HKfMRx1tcD4ep8EINoHT0hzWeTfu00J5OTByZ2");
  //   const cardDetails = {
  //     number: '4242424242424242',
  //     expMonth: 12,
  //     expYear: 2025,
  //     cvc: '220'
  //   }

  //   Stripe.createCardToken(cardDetails)
  //   .then(token =>{
  //     console.log(token);
  //   })
  //   .catch(error => console.log(error));
  // }
  return (
    <IonPage>
      <IonContent>
        <IonGrid>
          <IonRow className="ion-padding">
            <IonCol>
              <IonIcon
                icon={arrowBack}
                style={{ fontSize: "25px" }}
                onClick={() => {
                  router.push("/tabs/home");
                }}
              ></IonIcon>
            </IonCol>
          </IonRow>

          <IonRow className="ion-padding ion-text-center">
            <IonCol style={{top:"180px"}}>
              <IonText color="success" style={{fontWeight: "bold", fontSize: "25px"}}>Payment Successful</IonText><br />
              <IonText style={{width: "40px",height: "40px", background: "#1aaf1a", position:"absolute", borderRadius: "40px", left: "44%", top:"40px"}}><IonIcon icon={checkmarkOutline} style={{color: "white", fontWeight:"bold", fontSize:"30px", padding:"3px"}}/></IonText>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PaymentSheet;
