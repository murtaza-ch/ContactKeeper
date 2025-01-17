import React,{Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import ContactState from './contaxt/contact/ContactState';
import AuthState from './contaxt/auth/authState';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import AlertState from './contaxt/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


const App=()=> {
  return (
    <AlertState>
    <AuthState>
    <ContactState>
    <Router>
    <Fragment>
      
      <Navbar/>
      <div className="container">
        <Alerts/>
         <Switch>
           <PrivateRoute exact path='/' component={Home} />
           <PrivateRoute exact path='/about' component={About}/>
           <Route exact path='/register' component={Register}/>
           <Route exact path='/login' component={Login}/>
         </Switch>
      </div>
    </Fragment>
    </Router>
    </ContactState>
    </AuthState>
    </AlertState>
  );
}

export default App;
