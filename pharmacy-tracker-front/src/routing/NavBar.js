import React from 'react';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import Routing from './Routing';
import { auth } from '../firebase/firebaseConfig';
import { useAuth } from '../context/authContext';


export function NavBar() {
  const { user } = useAuth();
  /*const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  }*/

  return (
    <div>
      {user ? <NavBarAuthUser /> : <NavBarNonAuthUser />}
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
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="ms-5 d-flex form-search">
            <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
          </form>
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


const NavBarAuthUser = () => {

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
            <Link class="nav-edit-profile" to={Routing.editProfile}>Edit Profile</Link>
          </li>
        </ul>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <form class="ms-5 d-flex form-search">
            <input type="search" class="form-control" placeholder="Search" aria-label="Search" />
          </form>
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
