import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth, db} from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore/lite';
import { GeoPoint } from 'firebase/firestore/lite';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error ("There is not AuthProvider");
    return context;
}

export function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    .then(cred => {
        const newUserRef = doc(db, `users/${cred.user.uid}`);
        const newPharmacyRef = doc(db, `pharmacies/${cred.user.uid}`);
        const point = new GeoPoint(28.105557, -15.422794);
        setDoc(newUserRef, {uid: cred.user.uid, email: email, name:"Prueba"});
        //LA FARMACIA SE TIENE QUE CREAR POR ESTE MOMENTO CON LOCATION PUESTO, SI NO, EL MAPA DA FALLO
        //PORQUE FALTA UNA COMPROBACION DE QUE SI UNA FARMACIA NO TIENE LOCATION, NO CREE EL MARKER,
        //ESTE FALLO DARÁ UNA PANTALLA PRINCIPAL BLANCA Y NULLPOINTERS
        setDoc(newPharmacyRef, 
            {uid: cred.user.uid,email: email, Address: '',City: '',Location: point ,Owner:'', Phone: '',eClosing: '',
            eOpening: '', mClosing: '', mOpening: '', nPharmacy: ''
        });
    });
    
    // .then()(cred =>
    // {
    //     return db.collection('pharmacies').doc(cred.user.uid).set({
    //         uid: cred.user.uid,
    //         email: cred.user.email,
    //     });
    

    const logout = () => signOut(auth);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading("false");
        })
    }, [])

    return (<authContext.Provider value={{ signup, login , user, logout, loading}}>{children}</authContext.Provider>);
}