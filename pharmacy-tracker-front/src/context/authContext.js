import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../firebase/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore/lite';
import { GeoPoint } from 'firebase/firestore/lite';

export const authContext = createContext();

export const useAuth = () =>
{
    const context = useContext(authContext);
    if (!context) throw new Error("There is not AuthProvider");
    return context;
}

export function AuthProvider({ children })
{

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const signupUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
        .then(cred =>
        {
            const newUserRef = doc(db, `users/${cred.user.uid}`);
            setDoc(newUserRef, { uid: cred.user.uid, email: email, name: "Prueba" });
        });

    const signupPharm = (email, password, address, city, owner, phone, eclosing, eopening, mclosing, mopening, npharmacy, lat, long) => createUserWithEmailAndPassword(auth, email, password)
        .then(cred =>
        {
            const newPharmacyRef = doc(db, `pharmacies/${cred.user.uid}`);
            const newUserRef = doc(db, `users/${cred.user.uid}`);
            const point = new GeoPoint(lat, long);
            setDoc(newUserRef, { uid: cred.user.uid, email: email, name: "Prueba" });
            setDoc(newPharmacyRef,
                {
                    uid: cred.user.uid, email: email, Address: address, City: city, Location: point, Owner: owner, Phone: phone, eClosing: eclosing,
                    eOpening: eopening, mClosing: mclosing, mOpening: mopening, nPharmacy: npharmacy
                });
        });


    const logout = () => signOut(auth);

    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email, password);

    useEffect(() =>
    {
        const unsubscribed = onAuthStateChanged(auth, currentUser =>
        {
            setUser(currentUser);
            setLoading("false");
        })
    }, [])

    return (<authContext.Provider value={{ signupUser, signupPharm, login, user, logout, loading }}>{children}</authContext.Provider>);
}