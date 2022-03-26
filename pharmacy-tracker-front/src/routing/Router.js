import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './NavBar';

import Routing from './Routing';

import PharmacyProfile from '../pharmacies/pharmacyProfile';
import PharmacyUpdate from '../pharmacies/pharmacyUpdate';
import Home from '../home/home';
import PharmacyDelete from '../pharmacies/pharmacyDelete';
import Login from '../login/login';
import Register from '../components/Register';

class RouterComponent extends Component {
  render() {
    return (
      <BrowserRouter>
        {/** MENU **/}
        <NavBar />
        
        <Routes>
          {/** HOME **/}
            <Route path={Routing.home} element={<Home />}/>

            {/** Pharmacy Role **/}
            <Route path={Routing.myProfile} element={<PharmacyProfile />}/>
            <Route path={Routing.editProfile} element={<PharmacyUpdate />}/>
            <Route path={Routing.deleteProfile} element={<PharmacyDelete />}/>

            {/** User Role **/}
            <Route path={Routing.login} element={<Login />}/>
            <Route path={Routing.register} element={<Register/>}/>

        </Routes>
      </BrowserRouter>
    );
  }
}

export default RouterComponent;
