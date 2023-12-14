import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';
import countriesData from './countries.json';
import './RandomCountry.css';

interface Country {
    flag: string;
    country: string;
    code: string;
}

const countries: Country[] = countriesData as Country[];

const ShakeToRandomCountry: React.FC = () => {
    const [randomCountry, setCountry] = useState<Country | null>(null);
    const [running, setRun] = useState(false);
    const waittime = useRef<NodeJS.Timeout | null>(null);

    const startRandomSelection = () => {
        if (!running) {
            setRun(true);
            waittime.current = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * countries.length);
                setCountry(countries[randomIndex]);
            }, 100);

            setTimeout(() => {
                if (waittime.current) {
                    clearInterval(waittime.current);
                }
                setRun(false);
            }, 10000); 
        }
    };

    const handleShake = (event: DeviceMotionEvent) => {
        const shakeThreshold = 20;
        const { accelerationIncludingGravity } = event;

        let shake = Math.abs(accelerationIncludingGravity!.x!) > shakeThreshold || 
                    Math.abs(accelerationIncludingGravity!.y!) > shakeThreshold || 
                    Math.abs(accelerationIncludingGravity!.z!) > shakeThreshold;

        if (shake && !running) {
            startRandomSelection();
        }
    };

    useEffect(() => {
        window.addEventListener('devicemotion', handleShake);

        return () => {
            window.removeEventListener('devicemotion', handleShake);
        };
    }, [running]);

    return (
        <IonContent>
            <div className = "center">
                <IonButton onClick={startRandomSelection} disabled={running}>
                    <p>Start</p>
                </IonButton>
            </div>
            <br></br>

            {randomCountry && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle><h1>{randomCountry.country}</h1></IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <img src={randomCountry.flag} style={{ width: '200px', height: '100px' }} />
                        <p>Country Code: {randomCountry.code}</p>
                    </IonCardContent>
                </IonCard>
            )}
        </IonContent>
    );
};

export default ShakeToRandomCountry;
