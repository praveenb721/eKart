import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import AccountStore from "../../Stores/AccountStore";
import EKartActions from '../../Actions/EKartActions';
import HomePage from '../HomePage';
class ModifyAccount extends React.Component {
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
    this.setState ( AccountStore.getValidationResults(),
      ()=>{
        if(this.state.isAddedToServer === "success")
          this.props.history.push('/modifyAccount');
        else if(this.state.isAddedToServer === "failure")
          this.props.history.push('/modifyAccount');
      }
    );    
  }


  onSubmitHandler(event){
    event.preventDefault();
    let input = event.target.elements;
    let modifiedDetails = { 
      userName:input.userName.value,
      userMobileNumber:input.userMobileNumber.value,
      userPassword:input.userPassword.value,
      userConfirmPassword:input.userConfirmPassword.value
    };
    EKartActions.ModifyAccount(modifiedDetails);
  } 

  render() {
    return(
      <React.Fragment>
        <HomePage></HomePage>
        <h2 style = {{paddingLeft:"15px"}}>{this.state.isAddedToServer}</h2>
        <Form onSubmit={this.onSubmitHandler} style={{paddingLeft:"25px",paddingTop:"25px",width:'40%'}}>

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
              Modify
            </Button>
          </ButtonToolbar> 
        </Form>
      </React.Fragment>
      
    )
    
  }
}

export default ModifyAccount;