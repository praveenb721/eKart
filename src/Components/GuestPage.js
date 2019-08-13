import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

class GuestPage extends React.Component {
  
    render(){
      return (
        <React.Fragment>
          <Navbar bg="dark" variant="dark">
            <Nav className="mr-auto">

              <Nav >
                <NavLink to='/login' activeStyle={{color:"green"}} style={{marginRight:"15px"}}>
                  <h4>Login </h4>
                </NavLink>
              </Nav>

              <Nav >
                <NavLink to='/signUp' activeStyle={{color:"green"}} style={{marginRight:"15px"}}>
                  <h4>Sign Up </h4>
                </NavLink>
              </Nav>

              
            </Nav>
          </Navbar>
          <br></br>
          <br></br>
          <div style = {{paddingLeft:"15px"}}>
            <h3>Welcome to EKart</h3>
          </div>        
        </React.Fragment>
            
      )
    }
}

export default GuestPage;