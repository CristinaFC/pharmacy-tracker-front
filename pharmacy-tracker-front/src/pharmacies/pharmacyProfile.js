import React, { Component } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore/lite';
import { pharmacyConverter } from './pharmacy';

class PharmacyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datos: []
        };
    }

    async componentDidMount() {
        try {
            //Obtengo los datos de la BD que lo convierte a objeto Pharmacy (en este caso la farmacia llamada 1)
            const docRef = doc(db, "pharmacies", "1").withConverter(pharmacyConverter);
            const docSnap = await getDoc(docRef);
            const pharmacy = docSnap.data();

            this.setState({
                datos: pharmacy,
            })

            if (docSnap.exists()) {
                console.log("Document data:",pharmacy);
            } else {
                console.log("No such document!");
            }
        } catch (e) {
        console.error("Error adding document: ", e);
        }
    }
    
    render() {
        const {datos} = this.state;
        const {location} = this.state.datos;
        return(
            <div>
                <ul>
                    <li>Nº Pharmacy: {datos.nPharmacy}</li>
                    <li>Address: {datos.address}</li>
                    <li>City: {datos.city}</li>
                    <li>Location: </li>
                        {
                        location ? location['latitude'] : null} { }
                        {
                        location ? location['longitude'] : null}
                    <li>Owner: {datos.owner}</li>
                    <li>Phone: {datos.phone}</li>
                    <li>Morning Opening: {datos.mOpening}</li>
                    <li>Morning Closing: {datos.mClosing}</li>
                    <li>Evening Opening: {datos.eOpening}</li>
                    <li>Evening Closing: {datos.eClosing}</li>
                </ul>
            </div>
        );
    };    
}



export default PharmacyProfile;




