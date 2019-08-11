import axios from 'axios';
var EventEmitter = require('events').EventEmitter;
var CHANGE_EVENT = 'change';

class CardStore extends EventEmitter {
  constructor() {
    super(); 
    this.cardData = '';
         
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT,callback);
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
}

var cardStore = new CardStore();
export default cardStore;