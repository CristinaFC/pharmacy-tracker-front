import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';
import { auth } from '../firebase/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getUserData } from '../database/functions'


export function NavBar()
{
  const [login, setLogin] = useState();

  try
  {
    const userRef = getAuth().currentUser.uid;
    getUserData(userRef).then((data) =>
    {
      if (data.role == "normal_user")
      {
        setLogin(true);
      } else if (data.role == "pharmacy")
      {
        setLogin(false);
      }
    })
  } catch (e)
  {
    console.log(e);
  }

  const isLogged = getAuth().currentUser;


  return (
    <div>
      {isLogged == null ? <NavBarNonAuthUser /> : login == true ? <NavBarAuthUser /> : <NavBarPharmacy />}
    </div>
  );

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
          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-products" to={Routing.products}>Products</Link>
            </li>
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
        <Link class="navbar-brand" to={Routing.home}>
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
              <Link class="nav-logout" onClick={(e) => auth.signOut()} to={Routing.home}>Log out</Link>
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
        <Link class="navbar-brand" to={Routing.home}>
          <strong class="title">Pharmacy Tracker </strong>
        </Link>
        <ul class="navbar-nav ms-5">
          <li class="nav-item" >
            <Link class="nav-profile" to={Routing.userProfile}>Profile</Link>
          </li>
          <li class="nav-item" >
            <Link class="nav-products" to={Routing.products}>Products</Link>
          </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

          <ul class="navbar-nav ms-5">
            <li class="nav-item" >
              <Link class="nav-logout" onClick={() => auth.signOut()} to={Routing.home}>Log out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
