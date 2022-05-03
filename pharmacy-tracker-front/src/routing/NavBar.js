import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';
import { db , auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/authContext';
import { getDoc, doc, collection } from "firebase/firestore/lite";
import { getAuth } from 'firebase/auth';
import { getUserData } from '../database/functions'


// class NavBar extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       user: []
//     }
//   }

//   async componentDidMount() {

//     const id = getAuth().currentUser.uid;
//     console.log(id);
//     if(id != null){
//       const data =  await getUserData();
//       console.log(data);
//       this.setState({user: data});
//     }
    
//   }

//   render(){

//     const {user} = this.state;
//     if(user !== undefined){

//       if (user.role == "normal_user") {
//         console.log('DENTRO');
//         return (
//         <div>
//           <NavBarAuthUser/>
//         </div>
//         );
//       }else{
//             return (
//               <div>
//                 <NavBarPharmacy/>
//               </div>
//               );
//       }
//     }

   
//     return (
//       <div>
//         {<NavBarNonAuthUser/>}
//       </div>
//       );
//   }
  
// }

export function NavBar()
{
  const [login, setLogin] = useState();
  const [user, setUser] = useState();
  try {
    const userRef = getAuth().currentUser.uid;
    getUserData(userRef).then((data) => {
      if (data.role == "normal_user") {
        setLogin(true);
      } else if (data.role == "pharmacy") {
        setLogin(false);
      }
    })
  } catch(e) {
    console.log(e);
  }

  const isLogged = getAuth().currentUser;
  
  // getUserData(user).then((data) => {
  //   if (data.role == "normal_user") {
  //     console.log(data);
  //     setLogin(true);
  //     return (
  //     <div>
  //       <NavBarAuthUser/>
  //     </div>
  //     );
  //   }else{
  //         return (
  //           <div>
  //             <NavBarPharmacy/>
  //           </div>
  //           );
  //   }
  //     }).catch(e => {
  //       console.error(e);
  //     });
    //console.log(data);
 


      // if(isLogged) {
      //   console.log('here');
      //   return (
      //     <div>
      //       {nUser === true ? <NavBarAuthUser/> : <NavBarPharmacy/>}
      //     </div>
      
      //   );
      // }
  console.log("Llego");
  return (
    <div>
      {isLogged == null ? <NavBarNonAuthUser/> : login == true ? <NavBarAuthUser/> : <NavBarPharmacy/>}
    </div>
    );

  // var status = async function () {
  //   const user = getAuth().currentUser.uid;
  //   const data = getUserData(user);
  //   status = await data.role;
  //   console.log(status);
  // }
  
  // const getUser = async () => {
  //   let doc = null;
  //   const userRef = db.collection('users').doc(user.uid);
  //   doc = await userRef.get();
  //   console.log(doc);
  // }
  
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
              <Link class="nav-logout" onClick={(e) => auth.signOut()} to={Routing.home}>Log out</Link>
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
console.log('DENTRO');
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