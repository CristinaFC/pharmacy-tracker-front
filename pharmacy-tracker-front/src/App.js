import { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { auth } from './firebase/firebaseConfig';
import RouterComponent from './routing/Router';
import { AuthProvider } from './context/authContext';
import { onAuthStateChanged } from "firebase/auth";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        this.setState({user: user});
      }else {
        this.setState({user: null});
      }
    });
  }

  render(){
    return (
      <div className="App">
        <AuthProvider>
          <RouterComponent />
        </AuthProvider>
      </div>
    );
  };
  
}

export default App;
