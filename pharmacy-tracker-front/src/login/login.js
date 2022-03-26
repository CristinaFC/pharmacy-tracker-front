import React, { Component } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Routing from "../routing/Routing";
import {Link} from 'react-router-dom';


class Login extends Component {

    user = React.createRef();
    password = React.createRef();

    constructor(props) {
        super(props);

        this.login = this.login.bind(this);
        this.singup = this.singup.bind(this);
    }

    login(event) {
        event.preventDefault();
        const myUser = this.user.current.value;
        const myPassword = this.password.current.value;

        signInWithEmailAndPassword(auth,myUser,myPassword).then((u) => {
            this.user = u.user;
        }).catch(function(error) {
            console.log(error);

        });
    }

    singup(event){
        event.preventDefault();
        const myUser = this.user.current.value;
        const myPassword = this.password.current.value;
        
        createUserWithEmailAndPassword(auth, myUser,myPassword).then((u) => {
            this.user = u.user;
        }).catch(function(error) {
            console.log(error);
        });
    }
 
    render() {
        return (
            <div class="login-container">
                <h1>Login</h1>
                <form class="login-container">
                    <div>
                        <input type="email" name="email" id="inputEmail" ref={this.user} 
                        placeholder="Email"class="mail-input" />                     
                    </div>
                    <div>
                        <input type="password" name="password" id="inputPassword" ref={this.password} placeholder="Password" class="password-input" />                     
                    </div>
                    <div class="forget-password-container">
                        <label>Forget password?</label>
                        <a href="#">click here</a>
                    </div>
                    <button type="submit" onClick={this.login} class="login-button">
                        <strong>Login</strong>  
                    </button> 
                </form>
            </div>
        );
    }
}

export default Login;