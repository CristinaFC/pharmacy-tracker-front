import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import {createUserWithEmailAndPassword} from 'firebase/auth'

import { auth, createUserDocument } from '../firebase/firebaseConfig';


export default function Register() {

    const [ fullname, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    // const firebase = useFirebaseApp(); 

    // const validatePassword = () => {
    //     let isValid = true
    //     if (password !== '' && confirmPassword !== ''){
    //       if (password !== confirmPassword) {
    //         isValid = false
    //         setError('Passwords does not match')
    //       }
    //     }
    //     return isValid
    //   }

      const register = e => {

        

        console.log("submiting values")
        e.preventDefault()
        // setError('')
        // if(validatePassword()) {
          // Create a new user with email and password using firebase
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                debugger
                const user = {
                    uid: res.user.uid,
                    email: email,
                    name: fullname,
                    role: "normal"
                }
                createUserDocument(user)
                console.log(res.user)
              })
            .catch(err => console.log(err.message))
        // }
        setEmail('')
        setPassword('')
        // setConfirmPassword('')
      }

    // const submit = async ()=> {
    //     //await firebase.auth().createUserWithEmailAndPassword(auth,email,password);
    //     createUserWithEmailAndPassword(auth, email, password)
    //     .then((res) => {
    //         console.log(res.user)
    //         })
    //     .catch(err => console.log(err.message))
    // }

    return (
        <div class="account-form">
            <form onSubmit={register}>
                <div class='title'>
                    <h1>Create Account</h1>
                </div>
                <div class="form-group row">
                        <input class="inputRegister" type="text" name="Name" placeholder='Full Name' onChange={ (ev)=> setFullName(ev.target.value)} />
                </div>
                <div class="form-group row">
                        <input class="inputRegister" type="email" name="email" placeholder='Email' onChange={(ev)=> setEmail(ev.target.value)} />
                </div>
                <div class="form-group row">
                        <input class="inputRegister" type="password" name="password" id="password" placeholder='Password' onChange={(ev)=> setPassword(ev.target.value)} />
                </div>
                <button type="submit" class="btn-register">Register</button>
                
            </form>
        </div>

        
    )
}


