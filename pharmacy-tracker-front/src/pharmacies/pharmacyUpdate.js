import React, { Component } from 'react';
import { db } from '../firebase/firebaseConfig';
import { getDoc, doc, setDoc } from 'firebase/firestore/lite';
import { pharmacyConverter } from './pharmacy';
import Pharmacy from './pharmacy';
import { getAuth } from 'firebase/auth';

class PharmacyUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            location: {
                latitude: 0.0,
                longitude: 0.0,
            },
            owner: '',
            phone: 0,
            eClosing: '',
            eOpening: '',
            mClosing: '',
            mOpening: '',
            nPharmacy: '',
            message: '',
        };

    }

    async componentDidMount() {
        try {
            //Recoger el uid de la farmacia logeada
            const currentUser = getAuth().currentUser.uid;
            //Obtengo los datos de la BD que lo convierte a objeto Pharmacy (en este caso la farmacia llamada 1)
            const docRef = doc(db, "pharmacies", currentUser).withConverter(pharmacyConverter);
            const docSnap = await getDoc(docRef);
            const pharmacy = docSnap.data();
            this.setState({
                address: pharmacy.address,
                city: pharmacy.city,
                location: {
                    latitude: pharmacy.location.latitude,
                    longitude: pharmacy.location.longitude,
                },
                owner: pharmacy.owner,
                phone: pharmacy.phone,
                eClosing: pharmacy.eClosing,
                eOpening: pharmacy.eOpening,
                mClosing: pharmacy.mClosing,
                mOpening: pharmacy.eOpening,
                nPharmacy: pharmacy.nPharmacy,
            });

            if (docSnap.exists()) {
                console.log("Document data:", pharmacy);
            } else {
                console.log("No such document!");
            }
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    render() {
        return (
            <div class="account-update">
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <div class="form-group row">
                        <label for="inputAddress" class="col-sm-2 col-form-label">Address:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputAddress" value={this.state.address} name="address" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputCity" class="col-sm-2 col-form-label">City:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputCity" value={this.state.city} name="city" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputLatitude" class="col-sm-2 col-form-label">Latitude:</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputLatitude" value={this.state.location ? this.state.location['latitude'] : ""} name="latitude" onChange={(e) => this.handleChangeLocation(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputLongitude" class="col-sm-2 col-form-label">Longitude:</label>
                        <div class="col-sm-10">
                            <input type="number" step="any" class="form-control" id="inputLongitude" value={this.state.location ? this.state.location['longitude'] : ""} name="longitude" onChange={(e) => this.handleChangeLocation(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputOwner" class="col-sm-2 col-form-label">Owner:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputOwner" value={this.state.owner} name="owner" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputPhone" class="col-sm-2 col-form-label">Phone:</label>
                        <div class="col-sm-10">
                            <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" placeholder="000000000" class="form-control" id="inputPhone" value={this.state.phone} name="phone" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputMOpening" class="col-sm-2 col-form-label">Mor. Opening:</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="inputMOpening" value={this.state.mOpening} name="mOpening" onChange={(e) => this.handleChange(e)} step="any" required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputMClosing" class="col-sm-2 col-form-label">Mor. Closing:</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="inputMClosing" step="any" value={this.state.mClosing} name="mClosing" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEOpening" class="col-sm-2 col-form-label">Ev. Opening:</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="inputEOpening" value={this.state.eOpening} name="eOpening" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEClosing" class="col-sm-2 col-form-label">Ev. Closing:</label>
                        <div class="col-sm-10">
                            <input type="time" class="form-control" id="inputEClosing" value={this.state.eClosing} name="eClosing" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputNPharmacy" class="col-sm-2 col-form-label">Nº Pharmacy:</label>
                        <div class="col-sm-10">
                            <input type="number" class="form-control" id="inputNPharmacy" value={this.state.nPharmacy} name="nPharmacy" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    {this.state.message ? <div><span>{this.state.message}</span></div> : ""}
                    <button type="submit" class="btn btn-primary">Update</button>
                </form>
            </div>
        );
    }

    handleChangeLocation(e) {
        this.setState({
            location: {
                ...this.state.location,
                [e.target.name]: e.target.value,
            },
        })
    }

    handleChange(e) {
        const name = e.target.name;

        this.setState({
            [name]: e.target.value,
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        try {
            const currentUser = getAuth().currentUser.uid;
            const ref = doc(db, "pharmacies", currentUser).withConverter(pharmacyConverter);
            await setDoc(ref, new Pharmacy(this.state.address, this.state.city, this.state.location, this.state.owner, this.state.phone, this.state.eClosing, this.state.eOpening, this.state.mClosing, this.state.mOpening, this.state.nPharmacy));
            this.setState({
                message: 'Profile updated',
            })

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
}



export default PharmacyUpdate;