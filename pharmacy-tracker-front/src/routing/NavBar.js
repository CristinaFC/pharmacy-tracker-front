import React from 'react';
import {Link} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';

const NavBar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <ul className="nav justify-content-end">
        <li className="nav-item">
          <Link className="nav-link" to={Routing.pharmacies}>
            My profile
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={Routing.signInPharmacy}>
            Sign in
          </Link>
        </li>
        <li>
          <Link className="nav-link" to={Routing.updatePharmacy}>
            Modify data
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export {NavBar};
