var Dispatcher = require('../Dispatcher/EKartDispatcher.js').AppDispatcher;
var EKartConstants = require('../Constants/EKartConstants.js');


let actions = {};

actions.AddAccount = function ( data ) {
  actions.sendToDispatcher ( data, EKartConstants.ADD_ACCOUNT)
}

actions.ModifyAccount = function ( data ) {
  actions.sendToDispatcher ( data, EKartConstants.MODIFY_ACCOUNT)
}

actions.AddCard = function ( data ) {
  actions.sendToDispatcher ( data, EKartConstants.ADD_CARD)
}

actions.Login = function ( data ) {
  actions.sendToDispatcher ( data, EKartConstants.LOGIN)
}

actions.DeleteCard = function ( data ) {
  actions.sendToDispatcher ( data, EKartConstants.DELETE_CARD)
}


actions.sendToDispatcher = ( data, type ) => {
    Dispatcher.handleAction({
      actionType: type,
      data: data
    });
  } 


module.exports = actions;

