import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ShakeToRandomCountry from '../components/RandomCountry';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
      <div className="center">
          <IonToolbar>
         
            <IonTitle className="responsive-title">Random Country</IonTitle>
          </IonToolbar>
        </div>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="center">
        <IonButton href="https://www.paypal.com/paypalme/triple666ix">DONATE TO SUPPORT</IonButton>
        </div>

        <ShakeToRandomCountry/>
          
          
        
      
      </IonContent>
    </IonPage>
  );
};

export default Home;
