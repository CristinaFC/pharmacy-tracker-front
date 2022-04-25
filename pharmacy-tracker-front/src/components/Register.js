import React, { useState } from 'react';
import 'firebase/auth';
import { useFirebaseApp } from 'reactfire';
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth, createUserDocument } from '../firebase/firebaseConfig';


export default function Register() {

    const [ fullname, setFullName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

      const register = e => {

        console.log("submiting values")
        e.preventDefault()
            createUserWithEmailAndPassword(auth, email, password)
            .then((res) => {
                console.log(res.user)
              })
            .catch(err => console.log(err.message))
        setEmail('')
        setPassword('')
      }

    return (
        <div class="account-form">
            <form onSubmit={register}>
                <div class='title'>
                    <h1>Create Account</h1>
                </div>
                <div class="Rrow">
                        <input class="inputRegister" type="text" name="Name" placeholder='Full Name' onChange={ (ev)=> setFullName(ev.target.value)} />
                </div>

                <div class="Rrow">
                        <input class="inputRegister" type="email" name="email" placeholder='Email' onChange={(ev)=> setEmail(ev.target.value)} />
                </div>

                <div class="Rrow">
                        <input class="inputRegister" type="password" name="password" id="password" placeholder='Password' onChange={(ev)=> setPassword(ev.target.value)} />
                </div>

                <div class="last-row">
                    <p>Create as:</p> 
                    <div class="radios">
                        <input type="radio" id="user" name="userType" value="user"/>
                        <label style={{margin: '0 100px 0 0'}} for="user">A User</label><br></br>
                        <input type="radio" id="pharmacy" name="userType" value="pharmacy"/>
                        <label for="pharmacy">A Pharmacy</label><br></br>
                    </div>
                </div>                
                <button type="submit" class="btn-register">Register</button>  
        </form>
    </div>
        
        
    )
}