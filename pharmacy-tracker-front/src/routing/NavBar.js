import React, { Component,  } from 'react';
import {Link, useNavigate} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/authContext';


export function NavBar(){
  const {user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  }
  return (
      <div>
        {user ?  <NavBarAuthUser /> : <NavBarNonAuthUser />}
      </div>
      
    );
}

// class NavBar extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       user: '',
//       logout: '',
//     }
//   }

//   componentDidMount() {
//     this.authListener();
//   }
//   authListener() {
//     onAuthStateChanged(auth, (user) => {
//       if(user) {
//         this.setState({user: user});
//       }else {
//         this.setState({user: null});
//       }
//     });
//   }

//   render() {
//     const Session = () => {
//       const {user, logout} = useAuth();
//     }

//     const handleLogout = async() => {
//       await Session.logout();
//     } 
//     return ( 
//       <div>
//         {user ?  <NavBarAuthUser /> : <NavBarNonAuthUser />}
//       </div>
      
//     );
   
//   }
// }

const NavBarNonAuthUser = () => {

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container">
          <Link class="navbar-brand" to={Routing.home}>
            <strong class="title">Pharmacy Tracker</strong>
          </Link>
          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-link" to={Routing.myProfile}>Profile</Link>
            </li>
          </ul>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="ms-5 d-flex form-search">
            <input type="search" class="form-control" placeholder="Search" aria-label="Search"/>
          </form>
          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-link" to={Routing.login}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  );
};
  

const NavBarAuthUser = () => {

  return(
    <nav class="navbar navbar-expand-lg">
      <div class="container">
          <Link class="navbar-brand" to={Routing.myProfile}>
            <strong class="title">Pharmacy Tracker </strong>
          </Link>
          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-link" to={Routing.myProfile}>Profile</Link>
            </li>
            <li class="nav-item" >
              <Link class="nav-link" to={Routing.editProfile}>Edit profile</Link>
            </li>
          </ul>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="ms-5 d-flex form-search">
            <input type="search" class="form-control" placeholder="Search" aria-label="Search"/>
          </form>
          <ul class="navbar-nav ms-5">  
            <li class="nav-item" >
              <button onClick={() => auth.signOut()}>
                <Link class="nav-link" to={Routing.home}>Log out</Link>
              </button>
              
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  );
};

export default NavBar;
