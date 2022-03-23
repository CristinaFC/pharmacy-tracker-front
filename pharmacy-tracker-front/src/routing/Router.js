import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { NavBar } from './NavBar';

import Routing from './Routing';

import PharmacyAccountForm from '../pharmacies/pharmacyAccountForm';
import PharmacyProfile from '../pharmacies/pharmacyProfile';

class RouterComponent extends Component {
  render() {
    return (
      <BrowserRouter>
        {/** MENU **/}
        <NavBar />
        
        <Routes>
            <Route path={Routing.signInPharmacy} element={<PharmacyAccountForm />}/>
            <Route path={Routing.pharmacies} element={<PharmacyProfile />}/>

        </Routes>
        
        {/** MODALS **/}
        </BrowserRouter>
    );
  }
}

export default RouterComponent;