import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import AccountStore from "../../Stores/AccountStore";
import EKartActions from './../../Actions/EKartActions';
import HomePage from '../HomePage';

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
    this.setState ( AccountStore.getValidationResults(),
      ()=>{
        if(this.state.isAddedToServer === "success")
          this.props.history.push('/addCard');
        else if(this.state.isAddedToServer === "failure")
          this.props.history.push('/addCard');
      }
    );    
  }



  onSubmitHandler(event){
    event.preventDefault();
    let input = event.target.elements;
    let cardDetails = { 
      cardNumber:input.cardNumber.value,
      nameOnCard:input.nameOnCard.value,
      expiryMonth:input.expiryMonth.value,
      expiryYear:input.expiryYear.value,
    };
    EKartActions.AddCard(cardDetails);
  } 

  render() {
    return(
      <React.Fragment>
        <HomePage></HomePage>
        <h3 style={{paddingLeft:"15px",color:"green"}}> {this.state.isAddedtoServer} </h3>
        <Form onSubmit={this.onSubmitHandler} style={{paddingLeft:"25px",paddingTop:"25px",width:'40%'}}>

          <Form.Group controlId="cardNumber" >
            <Form.Label>CardN umber</Form.Label>
            <Form.Control type="number" placeholder="Enter Card Number"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.cardNumberError}</p>

          <Form.Group controlId="nameOnCard">
            <Form.Label>Name on Card</Form.Label>
            <Form.Control type="text" placeholder="Enter Name on Card"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.nameOnCardError}</p>

          <Form.Group controlId="expiryMonth">
            <Form.Label>Expiry Month</Form.Label>
            <Form.Control type="number" placeholder="Enter Expiry Month"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.expiryMonthError}</p>

          <Form.Group controlId="expiryYear">
            <Form.Label>Expiry Year</Form.Label>
            <Form.Control type="number" placeholder="Enter Expiry Year"/>
          </Form.Group>
          <p style={{color:"red"}}>{this.state.expiryYearError}</p>


          <ButtonToolbar>
            <Button variant="primary" size="lg" type="submit">
              Submit
            </Button>
          </ButtonToolbar> 
        </Form>
      </React.Fragment>
      
    )
    
  }
}

export default SignUpForm;