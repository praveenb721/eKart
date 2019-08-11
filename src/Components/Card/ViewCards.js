import React from 'react';
import Button from "react-bootstrap/Button";
import EKartActions from './../../Actions/EKartActions';
import cardStore from '../../Stores/CardStore';
import Card from 'react-bootstrap/Card';
import HomePage from './../HomePage';

class ViewCards extends React.Component {
  constructor() {
    super();
    this.state = { 
      cards:{}
    };
   
  }

  componentDidMount() {
    cardStore.addChangeListener(this.changeEventHandler);
    let userId = sessionStorage.getItem("userId")
    cardStore.getCardDetails(userId);
  }

  componentWillUnmount() {
    cardStore.removeChangeListener(this.changeEventHandler);
  }

  changeEventHandler = () => {
    this.setState ( {cards: cardStore.getCardData()});  
  }


  deleteCard(cardNumber){
    EKartActions.DeleteCard(cardNumber);
  } 

  render() {
    let rowData = [];
    let cardDetails = this.state.cards;
    for ( let i=0; i< cardDetails.length; i++){
      var row = (
        <Card key = {i} style={{ margin:"30px",width:"15%"}}>
        <Card.Body>
            <Card.Text>{cardDetails[i].cardNumber} / {cardDetails[i].nameOnCard} </Card.Text>
            <Card.Text>{cardDetails[i].expiryMonth}/{cardDetails[i].expiryYear}</Card.Text> 
            <Button>Select</Button>
            <Button style={{margin:"2px"}} onClick={ ()=> this.deleteCard(cardDetails[i].cardNumber) }>Delete</Button>    
        </Card.Body>
        </Card>
      );
      rowData.push(row);
    }
    return(
      <div>
        <HomePage></HomePage>
        <h3 style={{paddingLeft:"15px",color:"green"}}> {this.state.isCardDeleted} </h3>
        {rowData}
      </div>
      
    )
    
  }
}

export default ViewCards;