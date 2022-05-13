import React, { Component } from 'react';
import { db } from '../firebase/firebaseConfig';
import { getDoc, doc } from 'firebase/firestore/lite';
import { userConverter } from './user';
import { getAuth } from 'firebase/auth';
import { updateDoc } from 'firebase/firestore';

class UserUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            role: '',
            uid: '',
        };

    }

    async componentDidMount() {
        try {
            const currentUser = getAuth().currentUser.uid;
            const docRef = doc(db, "users", currentUser).withConverter(userConverter);
            const docSnap = await getDoc(docRef);
            const user = docSnap.data();
            this.setState({
                email: user.email,
                name: user.name,
                role: user.role,
                uid: user.uid
            });

            if (docSnap.exists()) {
                console.log("Document data:", user);
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
                        <label for="inputName" class="col-sm-2 col-form-label">Name:</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="inputName" value={this.state.name} name="name" onChange={(e) => this.handleChange(e)} required />
                        </div>
                    </div>
                    {this.state.message ? <div><span>{this.state.message}</span></div> : ""}
                    <button type="submit" class="edit-button">Update</button>
                </form>
            </div>
        );
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
            const ref = doc(db, "users", currentUser).withConverter(userConverter);
            await updateDoc(ref, this.state.email, this.state.name, this.state.role, this.state.uid);
            this.setState({
                message: 'Profile updated',
            })

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
}



export default UserUpdate;