import React from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';

const NavBar = () => {
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
              <Link class="nav-link" to={Routing.myProfile}>Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  );
};

export {NavBar};
