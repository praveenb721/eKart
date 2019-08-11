import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import SignUpForm from './Components/Account/SignUpForm';
import AddCard from './Components/Card/AddCard';
import ViewCards from './Components/Card/ViewCards';
import HomePage from './Components/HomePage'
import GuestPage from './Components/GuestPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifyAccount from './Components/Account/ModifyAccount';
import LoginPage from './Components/Account/LoginPage';



class App extends React.Component {

  constructor(){
    super();
    this.state = {
    }
  }
  render(){
    return (
      <BrowserRouter>
          <Route path='/signup' component={SignUpForm} exact />
          <Route path='/modifyAccount' component={ModifyAccount} exact />
          <Route path='/addCard' component={AddCard} exact />
          <Route path='/viewCards' component={ViewCards} exact />
          <Route path='/login' component={LoginPage} exact />
          <Route path='/' component={GuestPage} exact />
          <Route path='/home' component={HomePage} exact />
          <Route path='/logout' component={GuestPage} exact />
          
          
        
      </BrowserRouter>  
    );
  }
  
}

export default App;
