import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './NavBar';
import Routing from './Routing';

import { ProtectedRoute } from './ProtectedRoute';
import { UserProtectedRoute } from './UserProtectedRoute';

/** USER */
import UserProfile from '../users/userProfile';
import UserUpdate from '../users/userUpdate';

/** PHARMACY **/
import PharmacyProfile from '../pharmacies/pharmacyProfile';
import PharmacyUpdate from '../pharmacies/pharmacyUpdate';
import PharmacyDelete from '../pharmacies/pharmacyDelete';

/** PRODUCTS **/
import MyProductsView from '../products/pharmacy/myProductsView';
import EditProductView from '../products/pharmacy/editProductView';
import CreateProductView from '../products/pharmacy/createProductView';


/** NAVBAR **/
import Home from '../home/home';
import Login from '../components/Login';
import Register from '../components/Register';
import RegisterPharm from '../components/RegisterPharm';
import ComparePrice from '../components/ComparePrice';
import ProductsView from '../products/user/productListView';
import ProductDetails from '../products/user/productDetails';

class RouterComponent extends Component
{
  render()
  {
    return (
      <BrowserRouter>
        {/** MENU **/}
        <NavBar />
        <Routes>
          {/** HOME **/}
          <Route path={Routing.home} element={<Home />} />
          <Route path={Routing.myProfile} element={<ProtectedRoute> <PharmacyProfile /> </ProtectedRoute>} />
          <Route path={Routing.editProfile} element={<ProtectedRoute><PharmacyUpdate /> </ProtectedRoute>} />
          <Route path={Routing.deleteProfile} element={<ProtectedRoute><PharmacyDelete /> </ProtectedRoute>} />
          {/** User Role **/}
          <Route path={Routing.login} element={<Login />} />
          <Route path={Routing.userProfile} element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path={Routing.updateProfile} element={<ProtectedRoute><UserUpdate /></ProtectedRoute>} />
          <Route path={Routing.register} element={<UserProtectedRoute><Register /></UserProtectedRoute>} />
          <Route path={Routing.compareprice} element={<UserProtectedRoute><ComparePrice /></UserProtectedRoute>} />
          <Route path={Routing.products} element={<ProductsView />} />
          <Route path={`${Routing.productDetails}${Routing.id}`} element={<ProductDetails />} />

          {/** Pharmacy Role **/}
          <Route path={Routing.registerpharm} element={<UserProtectedRoute><RegisterPharm /></UserProtectedRoute>} />
          <Route path={Routing.myProducts} element={<ProtectedRoute><MyProductsView /></ProtectedRoute>} />
          <Route path={Routing.editProduct} element={<EditProductView />} />
          <Route path={Routing.addProduct} element={<CreateProductView />} />

        </Routes>
      </BrowserRouter>
    );
  }
}

export default RouterComponent;