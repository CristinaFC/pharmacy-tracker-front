import React ,{useState} from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';
import { db , auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/authContext';
import { getDoc, doc, collection } from "firebase/firestore/lite";
import { getAuth } from 'firebase/auth';
import { getUserData } from '../database/functions'

export function NavBar()
{
  let role;
  const isLogged = getAuth().currentUser;
  try {
    const user = getAuth().currentUser.uid;
    const data = getUserData(user);
    data.then(function(value){
      role = value.role;
      if (role == 'normal_user') {
        console.log("nose");
        return (
          <div> 
            <NavBarAuthUser/>
          </div>
        );
      } else if (role == 'pharmacy') {
        console.log("nose2");
          return (
            <div>
                <NavBarPharmacy/>
            </div>
          );
      } else {
        return (
          <div>
            <NavBarNonAuthUser/>
          </div>
        )
      }
    });
  } catch (e) {
      console.error("Error reading document: ", e);
  }
}

const NavBarNonAuthUser = () =>
{

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <Link class="navbar-brand" to={Routing.home}>
          <strong class="title">Pharmacy Tracker</strong>
        </Link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <form class="ms-5 d-flex form-search">
            <input type="search" class="form-control" placeholder="Search" aria-label="Search"
            />
          </form> */}
          <ul class="navbar-nav ms-5">
            <li class="nav-item top-r" >
              <Link class="nav-login" to={Routing.login}>Login</Link>
            </li>
            <li class="nav-item top-r" >
              <Link class="nav-register" to={Routing.register}>Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavBarPharmacy = () =>
{
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <Link class="navbar-brand" to={Routing.myProfile}>
          <strong class="title">Pharmacy Tracker </strong>
        </Link>
        <ul class="navbar-nav ms-5">
          <li class="nav-item" >
            <Link class="nav-profile" to={Routing.myProfile}>Profile</Link>
          </li>
          <li class="nav-item" >
            <Link class="nav-products" to={Routing.myProducts}>Products</Link>
          </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-logout" onClick={() => auth.signOut()} to={Routing.home}>Log out</Link>
            </li>
            <li>
              <a> Your role is: Pharmacy </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

const NavBarAuthUser = () =>
{

  return (
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <Link class="navbar-brand" to={Routing.userProfile}>
          <strong class="title">Pharmacy Tracker </strong>
        </Link>
        <ul class="navbar-nav ms-5">
          <li class="nav-item" >
            <Link class="nav-profile" to={Routing.userProfile}>Profile</Link>
          </li>
          {/* <li class="nav-item" >
            <Link class="nav-products" to={Routing.myProducts}>Products</Link>
          </li> */}
        </ul>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-logout" onClick={() => auth.signOut()} to={Routing.home}>Log out</Link>
            </li>
            <li>
              <a> Your role is: Normal User </a>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

async function getRole() {
    const isLogged = getAuth().currentUser;
  let role;
  try {
    const user = getAuth().currentUser.uid;
    const data = getUserData(user);
    data.then(function(value){
      role = value.role; 
    });
  } catch (e) {
      console.error("Error reading document: ", e);
  }
}