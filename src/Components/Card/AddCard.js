import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import CardStore from "../../Stores/CardStore";
import EKartActions from './../../Actions/EKartActions';
import HomePage from '../HomePage';

class SignUpForm extends React.Component {
  constructor() {
    super();
    this.state = { 
      
    };
  }

  componentDidMount() {
    CardStore.addChangeListener(this.changeEventHandler);
  }

  componentWillUnmount() {
    CardStore.removeChangeListener(this.changeEventHandler);
  }

  changeEventHandler = () => {
    this.setState ( CardStore.getValidationResults(),
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
    var result ;
    if(this.state.isAddedToServer === "success" )
      result = <h4 style={{paddingLeft:"15px",paddingTop:"15px",color:"green"}}>Card has been added successfully</h4> ;
    if(this.state.isAddedToServer === "Server error occured" )
      result = <h4 style={{paddingLeft:"15px",paddingTop:"15px",color:"red"}}>Server error occured. Please try after some time</h4>;
    
    return(
      <React.Fragment>
        <HomePage></HomePage>
        {result}
        <h3 style={{paddingLeft:"15px",color:"green"}}> {this.state.isAddedtoServer} </h3>
        <Form onSubmit={this.onSubmitHandler} style={{paddingLeft:"25px",paddingTop:"25px",width:'40%'}}>

          <Form.Group controlId="cardNumber" >
            <Form.Label>Card Number</Form.Label>
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