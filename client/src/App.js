import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from "jwt-decode";
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

import './App.css';

// Check for token
if(localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
}


function App() {
  return (
    <Provider store={ store }>
      <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={ Landing } />
        <div className="container">
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
        </div>
        <Footer />
      </div>
      </Router>
    </Provider>
  );
}

export default App;
