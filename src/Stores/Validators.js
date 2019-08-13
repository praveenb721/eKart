let validators = {};

validators.isAccountValid = function (data) {
  let validationResults = { };
  let keysArray = Object.keys(data);

  for ( let i = 0; i < keysArray.length; i++ ) {

    let field = keysArray[i];
    switch (field) {
    
    case "userId": {
        if(data.userId.length === 0)
            validationResults["userIdError"] = "All fields are mandatory";
        else
            validationResults["userIdError"] = "";
        break;  
    }
    

    case "userName": {
        if(data.userName.length === 0)
            validationResults["userNameError"] = "All fields are mandatory";
        else if (data.userName.match(/[^a-zA-Z ]+/))
            validationResults["userNameError"] = "Name should not contain special characters";
        else
            validationResults["userNameError"] = "";
        break;  
        }

    case "userMobileNumber": {
        if(data.userMobileNumber.length === 0)
            validationResults["userMobileNumberError"] = "All fields are mandatory";
        else
            validationResults["userMobileNumberError"] = "";
        break;  
        }

    case "userEmailAddress": {
        if(data.userEmailAddress.length === 0)
            validationResults["userEmailAddressError"] = "All fields are mandatory";
        else
            validationResults["userEmailAddressError"] = "";
        break;  
        }

    case "userPassword": {
        if( data.userPassword.length === 0 )
            validationResults["userPasswordError"] = "All fields are mandatory";
        else if (! data.userPassword.match( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ) )
            validationResults["userPasswordError"] = "Password Should contain an uppercase, a lowercase, a special character and a number";
        else    
            validationResults["userPasswordError"] = "";
        break;  
        }

    case "userConfirmPassword": {
        if( data.userConfirmPassword.length === 0 )
            validationResults["userConfirmPasswordError"] = "All fields are mandatory";
        else if ( data.userPassword !== data.userConfirmPassword )
            validationResults["userConfirmPasswordError"] = "Password and Confirm Password are not matching";
        else
            validationResults["userConfirmPasswordError"] = "";
        break;  
        }
    
    default:
        //
    }
  }

  if( validators.checkIfEmpty (validationResults) )
        return "valid";
    else
        return validationResults;
}

validators.isCardValid = function (data){
  let validationResults = { };
  let keysArray = Object.keys(data);

  for ( let i = 0; i < keysArray.length; i++ ) {

    let field = keysArray[i];
    switch (field) {

        case "cardNumber": {
            if(data.cardNumber.length === 0)
                validationResults["cardNumberError"] = "All fields are mandatory";
            else
                validationResults["cardNumberError"] = "";
            break;  
        }

        case "nameOnCard": {
            if(data.nameOnCard.length === 0)
                validationResults["nameOnCardError"] = "All fields are mandatory";
            else
                validationResults["nameOnCardError"] = "";
            break;  
        }

        case "expiryMonth": {
            if(data.expiryMonth.length === 0)
                validationResults["expiryMonthError"] = "All fields are mandatory";
            else if (data.expiryMonth < 1 || data.expiryMonth > 12)
                validationResults["expiryMonthError"] = "Invalid month";
            else
                validationResults["expiryMonthError"] = "";
            break;  
        }

        case "expiryYear": {
            if(data.expiryYear.length === 0)
                validationResults["expiryYearError"] = "All fields are mandatory";
            else if (data.expiryYear < 0 || data.expiryYear > 9999)
                validationResults["expiryYearError"] = "Invalid year";
            else if (data.expiryMonth.length === 0)
                validationResults["expiryYearError"] = "";
            else if (data.expiryYear < new Date().getFullYear()) 
                validationResults["expiryYearError"] = "Card expired";
            else if (data.expiryYear <= new Date().getFullYear()){
                if(new Date().getMonth() > (data.expiryMonth - 1))
                    validationResults["expiryYearError"] = "Card expired";
                else
                    validationResults["expiryYearError"] = "";
            }
            else
                validationResults["expiryYearError"] = "";
            break;  
        }

        default:
            //
    }
  }
  
  if( validators.checkIfEmpty (validationResults) )
        return "valid";
    else
        return validationResults;
}

validators.isLoginValid = function (data) {
    let validationResults = {};
    if(data.userId.length === 0)
        validationResults["userIdError"] = "All fields are mandatory";
    if(data.userPassword.length === 0)
        validationResults["userPasswordError"] = "All fields are mandatory";
    if(Object.keys(validationResults).length === 0)
        return "valid";
    else 
        return validationResults;
       
    
}
  

validators.checkIfEmpty = function ( data ){
  let isEmpty = true;
  let keysArray = Object.keys(data);
  for ( let i = 0; i < keysArray.length; i++ ){
      if( data[keysArray[i]] !== "" ){
          isEmpty = false;
          break;
      }
  }
  return isEmpty;
}

module.exports = validators;