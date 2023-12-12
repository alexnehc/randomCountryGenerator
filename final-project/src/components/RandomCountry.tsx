import React, { useState, useEffect, useRef } from 'react';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonButton } from '@ionic/react';
import countriesData from './countries.json';
import './RandomCountry.css';

interface Country {
    flag: string;
    country: string;
    code: string;
}

const countries: Country[] = countriesData as Country[];

const ShakeToRandomCountry = () => {
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isRunning, setIsRunning] = useState(false);
    const [userHasInteracted, setUserHasInteracted] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startRandomSelection = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * countries.length);
                setSelectedCountry(countries[randomIndex]);
            }, 100); // Change country every 100 milliseconds

            setTimeout(() => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                }
                setIsRunning(false);
            }, 10000); // Stop after 10 seconds
        }
    };

    useEffect(() => {
        const handleShake = () => {
            console.log('Shake event detected');
            if (userHasInteracted) {
                console.log('Starting random selection');
                startRandomSelection();
            }
        };

        window.addEventListener('devicemotion', handleShake);

        return () => {
            window.removeEventListener('devicemotion', handleShake);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [userHasInteracted]);

    return (
        <IonContent>
        <div className = "center">
            <IonButton onClick={startRandomSelection} disabled={isRunning}>
                <p>Start</p>
            </IonButton>
        </div>

            {selectedCountry && (
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle><h1>{selectedCountry.country}</h1></IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <img src={selectedCountry.flag} style={{ width: '200px', height: '100px' }} />
                        <p>Country Code: {selectedCountry.code}</p>
                    </IonCardContent>
                </IonCard>
            )}
        </IonContent>
    );
};

export default ShakeToRandomCountry;
