import React, { Component } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore/lite';
import { pharmacyConverter } from './pharmacy';
import { EditProfileButton } from '../components/EditProfileButton';
import { DeleteProfileButton } from '../components/DeleteProfileButton';
import 'bootstrap/dist/css/bootstrap.min.css';

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
                <ul class="list-group account-form">
                    <li class="list-group-item active">Nº Pharmacy: {datos.nPharmacy}</li>
                    <li class="list-group-item">Address: {datos.address}</li>
                    <li class="list-group-item">City: {datos.city}</li>
                    <li class="list-group-item">Location:
                        { location ? " " + location['latitude'] : "" }
                        { location ? " " + location['longitude'] : "" }
                    </li>
                    <li class="list-group-item">Owner: {datos.owner}</li>
                    <li class="list-group-item">Phone: {datos.phone}</li>
                    <li class="list-group-item">Morning Opening: {datos.mOpening}</li>
                    <li class="list-group-item">Morning Closing: {datos.mClosing}</li>
                    <li class="list-group-item">Evening Opening: {datos.eOpening}</li>
                    <li class="list-group-item">Evening Closing: {datos.eClosing}</li>
                    <li class="list-group-item">
                        <EditProfileButton />
                        <DeleteProfileButton />
                    </li>
                </ul>
            </div>
        );
    };    
}



export default PharmacyProfile;




