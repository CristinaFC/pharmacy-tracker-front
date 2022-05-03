import React, { Component } from 'react';
import { db } from '../firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore/lite';
import { userConverter } from './user';
import { UserUpdateButton } from '../components/UserUpdateButton';
import { DeleteProfileButton } from '../components/DeleteProfileButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getAuth } from 'firebase/auth';

class UserProfile extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            datos: []
        };
    }

    async componentDidMount()
    {
        try
        {
            //Recoger el uid del usuaruio logeado
            const currentUser = getAuth().currentUser.uid;
            //Obtengo los datos de la BD que lo convierte a objeto User
            const docRef = doc(db, "users", currentUser).withConverter(userConverter);
            const docSnap = await getDoc(docRef);
            const user = docSnap.data();

            this.setState({
                datos: user,
            })

            if (docSnap.exists())
            {
                console.log("Document data:", user);
            } else
            {
                console.log("No such document!");
            }
        } catch (e)
        {
            console.error("Error adding document: ", e);
        }
    }

    render()
    {
        const { datos } = this.state;
        return (
            <div>
                <ul class="list-group account-form">
                    <li class="list-group-item active">Your profile</li>
                    <li class="list-group-item">Email: {datos.email}</li>
                    <li class="list-group-item">Name: {datos.name}</li>
                    <li class="list-group-item">Role: {datos.role}</li>
                    <li class="list-group-item">UID: {datos.uid}</li>
                    <li class="list-group-item">
                        <UserUpdateButton />
                        <DeleteProfileButton />
                    </li>
                </ul>
            </div>
        );
    };
}



export default UserProfile;




