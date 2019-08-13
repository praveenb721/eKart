import axios from 'axios';
var Validators = require('./Validators');;
var Dispatcher = require('../Dispatcher/EKartDispatcher.js').AppDispatcher;
var EventEmitter = require('events').EventEmitter;
var EKartConstants = require('../Constants/EKartConstants');
var CHANGE_EVENT = 'change';

class AccountStore extends EventEmitter {
  constructor() {
    super();   
    this.addAccountValidationResults = {};
    this.modifyAccountValidationResults = {};
    this.loginAccountValidationResults = {};  
  }

  getAddAccountValidationResults(){
    return this.addAccountValidationResults;
  }

  getModifyAccountValidationResults(){
    return this.modifyAccountValidationResults;
  }

  getLoginAccountValidationResults(){
    return this.loginAccountValidationResults;
  }

  setAddAccountValidationResults(results){
    this.addAccountValidationResults = results;
    this.emit(CHANGE_EVENT);
  }

  setModifyAccountValidationResults(results){
    this.modifyAccountValidationResults = results;
    this.emit(CHANGE_EVENT);
  }

  setLoginAccountValidationResults(results){
    this.loginAccountValidationResults = results;
    this.emit(CHANGE_EVENT);
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
          validationFeedback = Validators.isAccountValid(data);  
          if(validationFeedback==='valid'){
            let serverFormatData = {...data,id:data.userId,cards:[]};
            axios.post("http://localhost:1010/userDetails",serverFormatData)
              .then (
                result => this.setAddAccountValidationResults({isAddedToServer : "Account Successfully Created"}),
                error => this.setAddAccountValidationResults({isAddedToServer : "Server error occured"})
              )
          }
          else
              this.setAddAccountValidationResults(validationFeedback); 
          
        break;

        case EKartConstants.MODIFY_ACCOUNT:
          validationFeedback = Validators.isAccountValid(data);  
          if(validationFeedback==='valid'){
            let userId = sessionStorage.getItem("userId");
            axios.put("http://localhost:1010/userDetails/"+userId,data)
              .then (
                result => this.setModifyAccountValidationResults({isAddedToServer : "success"}),
                error => this.setModifyAccountValidationResults({isAddedToServer : "failure"})
              )
          }
          else
              this.setModifyAccountValidationResults(validationFeedback); 
          
        break;

        

        case EKartConstants.LOGIN:
          validationFeedback = Validators.isLoginValid(data);  
          console.log(validationFeedback);
          if(validationFeedback==='valid'){
            axios.post("http://localhost:1020/login",data)
            .then (
                result =>{
                  sessionStorage.setItem("userId",data.userId);
                  this.setLoginAccountValidationResults({isAuthenticated : result.data});
                },
                error => this.setAccountLoginValidationResults({isAuthenticated : "failure"})
              );                       
          }
          else
              this.setLoginAccountValidationResults(validationFeedback);
              
          
        break;

        default:
          //

        
    }
  }
  
}

var accountStore = new AccountStore();
Dispatcher.register(accountStore.handleActions.bind(accountStore));

export default accountStore;