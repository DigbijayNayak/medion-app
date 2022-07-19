import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Cart.css';

const CartPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="white">
          <IonTitle style={{color: "black"}}>Cart Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Cart Page</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default CartPage;
