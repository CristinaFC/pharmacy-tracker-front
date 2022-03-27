import {createContext, useContext, useEffect, useState} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth';
import { auth, db} from '../firebase/firebaseConfig';
import { doc, setDoc, getFirestore } from 'firebase/firestore/lite';

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) throw new Error ("There is not AuthProvider");
    return context;
}

export function AuthProvider ({children}) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password).then(cred => {
        console.log(cred.user);
        const newUserRef = doc(db, `pharmacies/${cred.user.uid}`);
        setDoc(newUserRef, {email: email});
    });
    
    // .then()(cred =>
    // {
    //     return db.collection('pharmacies').doc(cred.user.uid).set({
    //         uid: cred.user.uid,
    //         email: cred.user.email,
    //         address: '',
    //         city: '',
    //         location: '',
    //         owner: '',
    //         phone: '',
    //         eClosing: '',
    //         eOpening: '',
    //         mClosing: '',
    //         mOpening: '',
    //         nPharmacy: '',

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