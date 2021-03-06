import React, { Component } from 'react';
import { db } from '../firebase/firebaseConfig';
import { setDoc, doc } from 'firebase/firestore/lite';
import { pharmacyConverter } from './pharmacy';
import Pharmacy from './pharmacy';

class PharmacyAccountForm extends Component {
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
        };
        
    }

    render() {
        
        return (
            <div className={'pharmaciesFormContainer'}>
                <h1>Sign In</h1>
                <form className={'pharmacyForm'} onSubmit={(e) => this.handleSubmit(e)}>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Address:</label>
                    <input type="text" class="form-control" id="exampleInput1" value={this.state.address} name="address" onChange={(e) =>  this.handleChange(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">City:</label>
                    <input type="text" class="form-control" id="exampleInput1" value={this.state.city} name="city" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Latitude:</label>
                    <input type="number" step="any" class="form-control" id="exampleInput1" value={this.state.location.latitude} name="latitude" onChange={(e) => this.handleChangeLocation(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Longitude:</label>
                    <input type="number" step="any" class="form-control" id="exampleInput1" value={this.state.location.longitude} name="longitude" onChange={(e) => this.handleChangeLocation(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Owner:</label>
                    <input type="text" class="form-control" id="exampleInput1" value={this.state.owner} name="owner" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Phone:</label>
                    <input type="tel" pattern="[0-9]{3}[0-9]{3}[0-9]{3}" placeholder="000000000" class="form-control" id="exampleInput1" value={this.state.phone} name="phone" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Morning Opening:</label>
                    <input type="time" class="form-control" id="exampleInput1" value={this.state.mOpening} name="mOpening" onChange={(e) => this.handleChange(e)} step="any" required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInput1" class="form-label">Morning Closing:</label>
                    <input type="time" class="form-control" id="exampleInput1" step="any" value={this.state.mClosing} name="mClosing" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <div>
                    <label for="exampleInputEmail1" class="form-label">Evening Opening:</label>
                    <input type="time" class="form-control" id="exampleInputEmail1" value={this.state.eOpening} name="eOpening" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Evening Closing:</label>
                    <input type="time" class="form-control" id="exampleInputPassword1" value={this.state.eClosing} name="eClosing" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">N?? Pharmacy:</label>
                    <input type="number" class="form-control" id="exampleInputPassword1" value={this.state.nPharmacy} name="nPharmacy" onChange={(e) => this.handleChange(e)} required/>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
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

    handleChange (e) {
        const name = e.target.name;
       
        this.setState({
            [name]: e.target.value,
        });
    }

    async handleSubmit (e) {
        e.preventDefault();
        try {
    
            const ref = doc(db, "pharmacies", this.state.nPharmacy).withConverter(pharmacyConverter);
            await setDoc(ref, new Pharmacy(this.state.address, this.state.city, this.state.location, this.state.owner, this.state.phone, this.state.eClosing, this.state.eOpening, this.state.mClosing, this.state.mOpening, this.state.nPharmacy));
            
        } catch (e) {
            console.error("Error adding document: ", e);
        }
                  
        this.setState({
            address: '',
            city: '',
            location: '',
            owner: '',
            phone: '',
            eClosing: '',
            eOpening: '',
            mClosing: '',
            mOpening: '',
            nPharmacy: '',
        });
    };
}
export default PharmacyAccountForm;




