import axios from 'axios';
var Validators = require('./Validators');;
var Dispatcher = require('../Dispatcher/EKartDispatcher.js').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var EKartConstants = require('../Constants/EKartConstants');
var CHANGE_EVENT = 'change';

class AppStore extends EventEmitter {
  constructor() {
    super(); 
    this.validationResults = {};     
  }

  setValidationResults (data) {
    this.validationResults = data;
    this.emit(CHANGE_EVENT);
  }

  getValidationResults () {
      return this.validationResults;
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback){
    this.removeListener(CHANGE_EVENT,callback);
  }

  handleActions(payload) {
    let type = payload.action.actionType;
    let data = payload.action.data;
    let validationFeedback;
    switch (type) {
        case EKartConstants.ADD_ACCOUNT:
          Validators.isAccountValid(data);
          validationFeedback = Validators.isAccountValid(data);  
          if(validationFeedback==='valid'){
            let serverFormatData = {...data,id:data.userId,cards:[]};
            axios.post("http://localhost:1010/userDetails",serverFormatData)
              .then (
                result => this.setValidationResults({isAddedToServer : "Account Successfully Created"}),
                error => this.setValidationResults({isAddedToServer : "Server error occured"})
              )
          }
          else
              this.setValidationResults(validationFeedback); 
          
        break;

        case EKartConstants.MODIFY_ACCOUNT:
          Validators.isAccountValid(data);
          validationFeedback = Validators.isAccountValid(data);  
          if(validationFeedback==='valid'){
            let userId = sessionStorage.getItem("userId");
            axios.put("http://localhost:1010/userDetails/"+userId,data)
              .then (
                result => this.setValidationResults({isAddedToServer : "success"}),
                error => this.setValidationResults({isAddedToServer : "failure"})
              )
          }
          else
              this.setValidationResults(validationFeedback); 
          
        break;

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

        case EKartConstants.LOGIN:
          Validators.isAccountValid(data);
          validationFeedback = Validators.isAccountValid(data);  
          if(validationFeedback==='valid'){
            axios.post("http://localhost:1020/login",data)
            .then (
                result =>{
                  sessionStorage.setItem("userId",data.userId);
                  this.setValidationResults({isAuthenticated : result.data});
                },
                error => this.setValidationResults({isAuthenticated : "failure"})
              );                       
          }
          else
              this.setValidationResults(validationFeedback);
              
          
        break;

        case "DELETE_CARD":
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

var appStore = new AppStore();
Dispatcher.register(appStore.handleActions.bind(appStore));

export default appStore;