import { Component } from 'react';
import './App.css';
import { auth } from './firebase/firebaseConfig';
import RouterComponent from './routing/Router';

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
        <RouterComponent />
      </div>
    );
  };
  
}

export default App;
