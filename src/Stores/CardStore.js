import axios from 'axios';
import Validators from './Validators';

var Dispatcher = require('../Dispatcher/EKartDispatcher.js').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var EKartConstants = require('../Constants/EKartConstants');
var CHANGE_EVENT = 'change';


class CardStore extends EventEmitter {
  constructor() {
    super(); 
    this.cardData = '';
    this.validationResults = '';
         
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT,callback);
  }

  getValidationResults () {
    return this.validationResults;
  }

  setValidationResults (data) {
    this.validationResults = data;
    this.emit(CHANGE_EVENT);
  }
  
  setCardData(data) {
    this.cardData = data;
    this.emit (CHANGE_EVENT);
  }

  getCardData(){
     return this.cardData;
  }

  getCardDetails = (userId) => {
      axios.get ('http://localhost:1010/userDetails/'+userId)
        .then(
            result => this.setCardData (result.data.cards),
            error => this.cardData = error
        );
        
        
  }

  handleActions(payload) {
    let type = payload.action.actionType;
    let data = payload.action.data;
    let validationFeedback;
    switch (type) {

        case EKartConstants.ADD_CARD:
          validationFeedback = Validators.isCardValid(data);
          if(validationFeedback==='valid'){
            let userId = sessionStorage.getItem("userId");
            let serverFormatData = { "cards": data};
            axios.put("http://localhost:1010/userDetails/"+userId,serverFormatData)
              .then (
                result => this.setValidationResults({isAddedToServer : "success"}),
                error => this.setValidationResults({isAddedToServer : "failure"})
              )
          }
          
          else
            this.setValidationResults(validationFeedback);

        break;

        case EKartConstants.DELETE_CARD:
          axios.delete("http://localhost:1010/userDetails/cards/"+data )
            .then(
              result => this.setValidationResults({isCardDeleted : "success"}),
              error => this.setValidationResults({isCardDeleted : "failure"})
            );
          break;

        default:
            //return true;
    }
  }
}

var cardStore = new CardStore();
Dispatcher.register(cardStore.handleActions.bind(cardStore));

export default cardStore;