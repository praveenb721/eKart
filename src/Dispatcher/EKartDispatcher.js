var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action){
    this.dispatch({
        source:'DISPATCH',
        action:action
    });
}

module.exports.AppDispatcher = AppDispatcher;
