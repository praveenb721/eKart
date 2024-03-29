import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import AccountStore from "../../Stores/AccountStore";
import EKartActions from './../../Actions/EKartActions';
import {Link} from 'react-router-dom';
import GuestPage from './../GuestPage';

class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = { 
      validationResults:''
    };
  }

  componentDidMount() {
    AccountStore.addChangeListener(this.changeEventHandler);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.changeEventHandler);
  }

  changeEventHandler = () => {
    this.setState ( {validationResults : AccountStore.getLoginAccountValidationResults()},
      () => {
        if(this.state.validationResults.isAuthenticated === "valid")
          this.props.history.push('/home');
        else if (this.state.validationResults.isAuthenticated === "Invalid credentials...")
          this.props.history.push('/login');
      } );
    
  }


  onSubmitHandler(event){
    event.preventDefault();
    let input = event.target.elements;
    let loginDetails = { 
      userId:input.userId.value,
      userPassword:input.userPassword.value,
    };
    EKartActions.Login(loginDetails);
  } 

  render() {
      return(
      <React.Fragment>
        <GuestPage></GuestPage>
        <Form onSubmit={this.onSubmitHandler} style={{paddingLeft:"15px",paddingTop:"25px",width:'20%'}}>

          <Form.Group controlId="userId" >
            <Form.Label>UserID</Form.Label>
            <Form.Control type="text" placeholder="Enter UserID"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.validationResults.userIdError}</p>


          <Form.Group controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.validationResults.userPasswordError}</p>

          <ButtonToolbar>
            <Button variant="primary" size="lg" type="submit">
              Login
            </Button>
          </ButtonToolbar> 
        </Form>
        <br></br>
        <div style={{paddingLeft:"15px"}}>
          <Link to='/signup' >
            <h6> Click here to Signup </h6>
          </Link>
        </div>
        <h3 style={{paddingLeft:"15px",color:"red"}}>{this.state.validationResults.isAuthenticated}</h3>
        
      </React.Fragment>
      
    )
      
  }
}

export default LoginPage;
