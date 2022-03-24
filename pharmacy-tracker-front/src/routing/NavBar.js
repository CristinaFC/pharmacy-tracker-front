import React from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';

const NavBar = () => {
  return (
    <nav class="navbar navbar-expand-lg ">
      <div class="container">
          <Link class="navbar-brand" to={Routing.home}>
            <strong class="title">Pharmacy Tracker</strong>
          </Link>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="d-flex align-items-center w-100 form-search">
            <div class="input-group">
              <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
            </div>
            <a href="#!" class="text-white"><i class="fas fa-search ps-3"></i></a>
          </form>
          <ul class="navbar-nav ms-3">
            <li class="nav-item" >
              <Link class="nav-link d-flex align-items-center" to={Routing.myProfile}>Sign In</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav> 
  );
};

export {NavBar};
