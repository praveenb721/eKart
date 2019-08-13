import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import AccountStore from "../../Stores/AccountStore";
import EKartActions from './../../Actions/EKartActions';
import GuestPage from '../GuestPage';

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = { 
      
    };
  }

  componentDidMount() {
    AccountStore.addChangeListener(this.changeEventHandler);
  }

  componentWillUnmount() {
    AccountStore.removeChangeListener(this.changeEventHandler);
  }

  changeEventHandler = () => {
    this.setState ( AccountStore.getAddAccountValidationResults(),
      ()=>{
        if(this.state.isAddedToServer === "Account Successfully Created")
          this.props.history.push('/signup');
        else if(this.state.isAddedToServer === "Server error occured")
          this.props.history.push('/signup');
      }
    );    
  }


  onSubmitHandler(event){
    event.preventDefault();
    let input = event.target.elements;
    let signUpDetails = { 
      userId:input.userId.value,
      userName:input.userName.value,
      userMobileNumber:input.userMobileNumber.value,
      userEmailAddress:input.userEmailAddress.value,
      userPassword:input.userPassword.value,
      userConfirmPassword:input.userConfirmPassword.value
    };
    EKartActions.AddAccount(signUpDetails);
  } 

  render() {
    var result ;
    if(this.state.isAddedToServer === "Account Successfully Created" )
      result = <h4 style={{paddingLeft:"15px",color:"green"}}>Account has been created successfully</h4> ;
    if(this.state.isAddedToServer === "Server error occured" )
      result = <h4 style={{paddingLeft:"15px",color:"red"}}>Server error occured. Please try after some time</h4>;
    return(
      <React.Fragment>
        <GuestPage></GuestPage>
        {result}
        <Form onSubmit={this.onSubmitHandler} style={{paddingLeft:"15px",paddingTop:"25px",width:'20%'}}>

          <Form.Group controlId="userId" >
            <Form.Label>UserID</Form.Label>
            <Form.Control type="text" placeholder="Enter UserID"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.userIdError}</p>

          <Form.Group controlId="userName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.userNameError}</p>

          <Form.Group controlId="userMobileNumber">
            <Form.Label>Mobile Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Mobile Number"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.userMobileNumberError}</p>

          <Form.Group controlId="userEmailAddress">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter Email Address"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.userEmailAddressError}</p>

          <Form.Group controlId="userPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.userPasswordError}</p>

          <Form.Group controlId="userConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Enter Password Again"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.userConfirmPasswordError}</p>

          <ButtonToolbar>
            <Button variant="primary" size="lg" type="submit">
              Create Account
            </Button>
          </ButtonToolbar> 
        </Form>

      </React.Fragment>
      
    )
    
  }
}

export default SignUpForm;