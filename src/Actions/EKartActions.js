var Dispatcher = require('../Dispatcher/EKartDispatcher.js').AppDispatcher;
var EKartConstants = require('../Constants/EKartConstants.js');


let actions = {};
actions.AddAccount = (data) => actions.sendToDispatcher (data, EKartConstants.ADD_ACCOUNT);
actions.ModifyAccount = (data) => actions.sendToDispatcher (data, EKartConstants.MODIFY_ACCOUNT);
actions.Login = (data) => actions.sendToDispatcher (data, EKartConstants.LOGIN);
actions.AddCard = (data) => actions.sendToDispatcher (data, EKartConstants.ADD_CARD);
actions.DeleteCard = (data) => actions.sendToDispatcher (data, EKartConstants.DELETE_CARD);


actions.sendToDispatcher = ( data, type ) => {
    Dispatcher.handleAction({
      actionType: type,
      data: data
    });
  } 


module.exports = actions;

